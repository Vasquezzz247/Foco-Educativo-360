const router = require("express").Router();
const { 
  register, 
  login, 
  logout,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  validateToken
} = require("../controllers/auth.controller");
const { authRequired } = require("../middlewares/auth");

// Rutas públicas
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Rutas que requieren autenticación
router.post("/logout", authRequired, logout);
router.post("/change-password", authRequired, changePassword);
router.get("/validate", authRequired, validateToken);

module.exports = router;