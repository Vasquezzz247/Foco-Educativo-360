require("dotenv").config();
const pool = require("./pool");

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB conectada:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("Error DB:", err);
    process.exit(1);
  }
})();
