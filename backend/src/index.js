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
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS mejorada
app.use(cors({
  origin: function(origin, callback) {

    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    const allowedOrigins = [
      "https://foco-educativo-360.vercel.app",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.1.16:5173"
    ];

    if (process.env.FRONTEND_URL) {
      const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "");
      allowedOrigins.push(frontendUrl);
    }

    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Origen no permitido:", origin);
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","X-Requested-With"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Logging solo en desarrollo
if (process.env.NODE_ENV === "development") {
  app.use((req,res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log("Origen:", req.headers.origin || "desconocido");
    console.log("IP:", req.ip || req.connection.remoteAddress);

    if (req.method === "POST" || req.method === "PUT") {
      console.log("Body:", req.body);
    }

    next();
  });
}

// HEALTH CHECK
app.get("/health", (_req,res)=>{
  res.json({
    status:"healthy",
    service:"Foco Educativo 360 API",
    timestamp:new Date().toISOString(),
    version:"1.0.0",
    environment:process.env.NODE_ENV || "development"
  });
});

// DOCUMENTACIÓN API
app.get("/", (_req,res)=>{
  res.json({
    message:"🚀 Foco Educativo 360 API - Plataforma Neuroeducativa",
    version:"1.0.0",
    documentation:{
      auth:{
        register:"POST /auth/register",
        login:"POST /auth/login",
        refreshToken:"POST /auth/refresh-token",
        logout:"POST /auth/logout (Requiere JWT)",
        validate:"GET /auth/validate (Requiere JWT)",
        requestBody:{
          register:"{ name, email, password, phone?, bio?, role? }",
          login:"{ email, password }"
        }
      },
      users:{
        profile:"GET /users/profile (JWT)",
        updateProfile:"PUT /users/profile (JWT)",
        list:"GET /users (Admin)",
        getById:"GET /users/:id"
      },
      health:"GET /health"
    },
    note:"Header requerido: Authorization: Bearer <token>"
  });
});

// RUTAS
app.use("/auth",authRoutes);
app.use("/users",userRoutes);

// 404
app.use((req,res)=>{
  res.status(404).json({
    error:"Endpoint no encontrado",
    path:req.path,
    method:req.method
  });
});

// ERROR GLOBAL
app.use((err,req,res,next)=>{
  console.error("❌ Error:",err);

  const statusCode = err.status || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    error:message,
    timestamp:new Date().toISOString(),
    path:req.path
  });
});

// START SERVER (NECESARIO PARA ALWAYSdata)
const PORT = process.env.PORT || 3000;

app.listen(PORT,"0.0.0.0",()=>{
  console.log(`🚀 API running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;