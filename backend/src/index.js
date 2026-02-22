require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");

const app = express();

// MIDDLEWARES
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } // Permite recursos cross-origin
}));

// CORS mejorada (Producción)
app.use(cors({
  origin: function(origin, callback) {
    // En desarrollo, permitir cualquier origen
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // En producción, orígenes permitidos
    const allowedOrigins = [
      'https://foco-educativo-360.vercel.app', 
      'http://localhost:5173', 
      'http://127.0.0.1:5173', 
      'http://192.168.1.16:5173'
    ];
    
    // URL Frontend (Opcional)
    if (process.env.FRONTEND_URL) {
      const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, '');
      allowedOrigins.push(frontendUrl);
    }
    
    // Permitir requests sin origen (apps móviles, Postman, etc)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Origen no permitido:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Logging para depuración (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('   Origen:', req.headers.origin || 'desconocido');
    console.log('   IP:', req.ip || req.connection.remoteAddress);
    if (req.method === 'POST' || req.method === 'PUT') {
      console.log('   Body:', req.body);
    }
    next();
  });
}

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
        refreshToken: "POST /auth/refresh-token",
        logout: "POST /auth/logout (Requiere JWT)",
        validate: "GET /auth/validate (Requiere JWT)",
        requestBody: {
          register: "{ name: string, email: string, password: string, phone?: string, bio?: string, role?: string }",
          login: "{ email: string, password: string }"
        }
      },
      users: {
        profile: "GET /users/profile (Requiere JWT)",
        updateProfile: "PUT /users/profile (Requiere JWT)",
        list: "GET /users (Requiere JWT - Admin)",
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
      { method: "POST", path: "/auth/refresh-token", description: "Refrescar token" },
      { method: "GET", path: "/users/profile", description: "Perfil usuario (requiere JWT)" },
      { method: "PUT", path: "/users/profile", description: "Actualizar perfil (requiere JWT)" }
    ]
  });
});

// MANEJO DE ERRORES GLOBAL
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  
  const statusCode = err.status || 500;
  const message = err.message || "Error interno del servidor";
  
  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
});

// Iniciar servidor solo en desarrollo
// Manejo automatico en Vercel
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`✅ API corriendo en modo DESARROLLO:`);
    console.log(`   - Local:  http://localhost:${port}`);
    
    // Mostrar todas las interfaces de red
    try {
      const interfaces = require('os').networkInterfaces();
      Object.keys(interfaces).forEach((iface) => {
        interfaces[iface].forEach((addr) => {
          if (addr.family === 'IPv4' && !addr.internal) {
            console.log(`   - Red:    http://${addr.address}:${port}`);
          }
        });
      });
    } catch (e) {
      // Ignorar errores al obtener interfaces
    }
    
    console.log(`📚 Documentación: http://localhost:${port}`);
    console.log(`🏥 Health check: http://localhost:${port}/health`);
    console.log(`🔐 Entorno: ${process.env.NODE_ENV || "development"}`);
  });
}

// Export para Vercel (Se mantiene para desarrollo)
module.exports = app;