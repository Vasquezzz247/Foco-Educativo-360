require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");

const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// HEALTH CHECK
app.get("/health", (_req, res) => {
  res.json({
    status: "healthy",
    service: "Foco Educativo 360 API",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development"
  });
});

// DOCUMENTACIÓN API
app.get("/", (_req, res) => {
  res.json({
    message: "🚀 Foco Educativo 360 API - Plataforma Neuroeducativa",
    version: "1.0.0",
    documentation: {
      auth: {
        register: "POST /auth/register",
        login: "POST /auth/login",
        requestBody: {
          register: "{ name: string, email: string, password: string }",
          login: "{ email: string, password: string }"
        }
      },
      users: {
        list: "GET /users (Requiere JWT)",
        getById: "GET /users/:id (Requiere JWT)"
      },
      health: "GET /health"
    },
    note: "Para endpoints protegidos, incluir header: Authorization: Bearer <token>"
  });
});

// RUTAS API
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// MANEJO DE ERRORES 404
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado",
    path: req.path,
    method: req.method,
    availableEndpoints: [
      { method: "GET", path: "/", description: "Documentación API" },
      { method: "GET", path: "/health", description: "Health check" },
      { method: "POST", path: "/auth/register", description: "Registrar usuario" },
      { method: "POST", path: "/auth/login", description: "Iniciar sesión" },
      { method: "GET", path: "/users", description: "Listar usuarios (requiere JWT)" },
      { method: "GET", path: "/users/:id", description: "Obtener usuario por ID (requiere JWT)" }
    ]
  });
});

// MANEJO DE ERRORES GLOBAL
app.use((err, req, res, next) => {
  console.error("Error:", err);
  
  const statusCode = err.status || 500;
  const message = err.message || "Error interno del servidor";
  
  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
});

// INICIAR SERVIDOR
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ API corriendo en http://localhost:${port}`);
  console.log(`📚 Documentación: http://localhost:${port}`);
  console.log(`🏥 Health check: http://localhost:${port}/health`);
  console.log(`🔐 Entorno: ${process.env.NODE_ENV || "development"}`);
});