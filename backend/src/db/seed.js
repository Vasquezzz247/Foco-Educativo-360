const bcrypt = require("bcrypt");
const pool = require("./pool");

async function seed() {
  try {
    console.log("Seeding database...");

    // limpiar tabla
    await pool.query(`
      TRUNCATE users RESTART IDENTITY CASCADE;
    `);

    const password = await bcrypt.hash("password123", 10);

    await pool.query(
      `
      INSERT INTO users (name, email, password_hash, role)
      VALUES
      ('Admin Principal', 'admin@foco360.com', $1, 'admin'),

      ('Carlos Martinez', 'carlos@foco360.com', $1, 'teacher'),
      ('Ana Lopez', 'ana@foco360.com', $1, 'teacher'),
      ('Pedro Sanchez', 'pedro@foco360.com', $1, 'teacher'),

      ('Luis Ramirez', 'luis@foco360.com', $1, 'student'),
      ('Maria Gomez', 'maria@foco360.com', $1, 'student'),
      ('Jose Rivera', 'jose@foco360.com', $1, 'student'),
      ('Sofia Castillo', 'sofia@foco360.com', $1, 'student')
      `,
      [password]
    );

    console.log("Users inserted successfully");

    process.exit(0);

  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();