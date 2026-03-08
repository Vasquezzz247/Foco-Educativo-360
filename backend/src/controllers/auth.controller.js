const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");

/* =========================
   Helpers
========================= */

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { sub: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d" }
  );
}

/* =========================
   Controllers
========================= */

async function register(req, res) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email, password required" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users 
      (name, email, password_hash, role)
      VALUES ($1,$2,$3,$4)
      RETURNING id,name,email,role,created_at`,
      [name, email.toLowerCase(), password_hash, role || "student"]
    );

    return res.status(201).json({
      user: result.rows[0],
      message: "User registered successfully"
    });

  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }

    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "email and password required" });

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    if (!user)
      return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    const refreshToken = signRefreshToken(user);

    await pool.query(
      `UPDATE users SET refresh_token=$1 WHERE id=$2`,
      [refreshToken, user.id]
    );

    delete user.password_hash;

    return res.json({ token, refreshToken, user });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function logout(req, res) {
  try {
    await pool.query(
      `UPDATE users SET refresh_token=NULL WHERE id=$1`,
      [req.user.sub]
    );

    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(400).json({ error: "refresh token required" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const result = await pool.query(
      `SELECT * FROM users WHERE id=$1 AND refresh_token=$2`,
      [decoded.sub, refreshToken]
    );

    const user = result.rows[0];

    if (!user)
      return res.status(401).json({ error: "Invalid refresh token" });

    const newToken = signToken(user);

    return res.json({ token: newToken });

  } catch {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ error: "email required" });

  try {
    const resetToken = require("crypto").randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    await pool.query(
      `UPDATE users 
       SET reset_password_token=$1, reset_password_expires=$2
       WHERE email=$3`,
      [resetToken, expires, email.toLowerCase()]
    );

    return res.json({
      message: "If account exists, reset link sent"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  if (!password)
    return res.status(400).json({ error: "password required" });

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `UPDATE users 
       SET password_hash=$1,
           reset_password_token=NULL,
           reset_password_expires=NULL,
           refresh_token=NULL
       WHERE reset_password_token=$2
       AND reset_password_expires > NOW()
       RETURNING id`,
      [password_hash, token]
    );

    if (!result.rowCount)
      return res.status(400).json({ error: "Invalid or expired token" });

    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id=$1`,
      [req.user.sub]
    );

    const user = result.rows[0];

    if (!user)
      return res.status(404).json({ error: "User not found" });

    const ok = await bcrypt.compare(currentPassword, user.password_hash);

    if (!ok)
      return res.status(401).json({ error: "Current password incorrect" });

    const newHash = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users 
       SET password_hash=$1, refresh_token=NULL
       WHERE id=$2`,
      [newHash, user.id]
    );

    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function validateToken(req, res) {
  try {
    const result = await pool.query(
      `SELECT id,name,email,role,created_at
       FROM users
       WHERE id=$1`,
      [req.user.sub]
    );

    if (!result.rowCount)
      return res.status(404).json({ valid: false });

    return res.json({
      valid: true,
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ valid: false });
  }
}

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  validateToken
};