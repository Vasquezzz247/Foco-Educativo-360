const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Mock para pruebas 

// Usuarios demo predefinidos
const mockUsers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Admin Demo',
    email: 'admin@foco360.com',
    password_hash: '$2b$10$Vw.LmQeB8hQF/fr3.7gGgeLfqI3C9N6k8X8jK7vY6m5n4c3v2b1n0m', // "password123"
    email_verified: true,
    role: 'admin',
    avatar_url: null,
    phone: '+52 123 456 7890',
    bio: 'Administrador del sistema Foco Educativo 360',
    refresh_token: null,
    email_verification_token: null,
    reset_password_token: null,
    reset_password_expires: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    name: 'Estudiante Demo',
    email: 'estudiante@foco360.com',
    password_hash: '$2b$10$Vw.LmQeB8hQF/fr3.7gGgeLfqI3C9N6k8X8jK7vY6m5n4c3v2b1n0m', // "password123"
    email_verified: true,
    role: 'student',
    avatar_url: null,
    phone: '+52 987 654 3210',
    bio: 'Estudiante entusiasta del aprendizaje',
    refresh_token: null,
    email_verification_token: null,
    reset_password_token: null,
    reset_password_expires: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Array usuarios temporales registrados (en memoria)
let registeredUsers = [];

// Funciones auxiliares

function signToken(user) {
  return jwt.sign(
    { 
      sub: user.id, 
      email: user.email,
      name: user.name,
      role: user.role 
    },
    process.env.JWT_SECRET || "secreto_desarrollo_foco_360",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { 
      sub: user.id, 
      email: user.email,
      name: user.name,
      role: user.role 
    },
    process.env.JWT_REFRESH_SECRET || "secreto_refresh_desarrollo_foco_360",
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d" }
  );
}

// Función para encontrar usuario por email (incluye usuarios demo y registrados)
function findUserByEmail(email) {
  const allUsers = [...mockUsers, ...registeredUsers];
  return allUsers.find(u => u.email === email.toLowerCase());
}

// Función para encontrar usuario por ID
function findUserById(id) {
  const allUsers = [...mockUsers, ...registeredUsers];
  return allUsers.find(u => u.id === id);
}

// Función para actualizar usuario
function updateUser(id, updates) {
  const allUsers = [...mockUsers, ...registeredUsers];
  const userIndex = allUsers.findIndex(u => u.id === id);
  
  if (userIndex !== -1) {
    // Determinar en qué array está
    if (userIndex < mockUsers.length) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates, updated_at: new Date().toISOString() };
      return mockUsers[userIndex];
    } else {
      const registeredIndex = userIndex - mockUsers.length;
      registeredUsers[registeredIndex] = { 
        ...registeredUsers[registeredIndex], 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
      return registeredUsers[registeredIndex];
    }
  }
  return null;
}

// Controladores

async function register(req, res) {
  const { name, email, password, phone, bio, role } = req.body;

  // 👇 LOGS DE DEPURACIÓN
  console.log('📝 INTENTO DE REGISTRO:');
  console.log('   - Datos recibidos:', { name, email, phone, bio, role });
  console.log('   - Contraseña presente:', !!password);
  console.log('   - Headers:', req.headers);
  console.log('   - IP:', req.ip || req.connection.remoteAddress);
  // 👆 FIN LOGS

  if (!name || !email || !password) {
    console.log('❌ Campos requeridos faltantes');
    return res.status(400).json({ error: "Nombre, email y contraseña son requeridos" });
  }

  try {
    // Verificar si el email ya existe
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      console.log('❌ Email ya existe:', email);
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const email_verification_token = crypto.randomBytes(32).toString("hex");
    const userRole = role || 'student';

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      password_hash,
      email_verification_token,
      phone: phone || null,
      bio: bio || null,
      role: userRole,
      avatar_url: null,
      email_verified: false,
      refresh_token: null,
      reset_password_token: null,
      reset_password_expires: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Guardar en array de usuarios registrados
    registeredUsers.push(newUser);
    console.log('✅ Usuario registrado:', { id: newUser.id, email: newUser.email });
    console.log('📊 Total usuarios registrados:', registeredUsers.length);

    // Crear tokens
    const token = signToken(newUser);
    const refreshToken = signRefreshToken(newUser);

    // Guardar refresh token
    newUser.refresh_token = refreshToken;

    // Preparar respuesta (sin password_hash)
    const { password_hash: _, refresh_token: __, ...userResponse } = newUser;

    return res.status(201).json({ 
      token,
      refreshToken,
      user: userResponse,
      message: "Usuario registrado exitosamente. Por favor verifica tu email." 
    });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    return res.status(500).json({ 
      error: "Error del servidor", 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    // Buscar usuario
    const user = findUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar contraseña
    // Para usuarios demo, "password123" sin bcrypt para facilidad de pruebas
    const isDemoUser = ['admin@foco360.com', 'estudiante@foco360.com'].includes(email.toLowerCase());
    let isValidPassword = false;
    
    if (isDemoUser) {
      // Para usuarios demo, se acepta contraseña en texto plano
      isValidPassword = password === 'password123';
    } else {
      // Para usuarios registrados, usar bcrypt
      isValidPassword = await bcrypt.compare(password, user.password_hash);
    }

    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar email (pruebas)
    /*
    if (!user.email_verified) {
      return res.status(403).json({ 
        error: "Por favor verifica tu email primero",
        requires_verification: true 
      });
    }
    */

    // Generar tokens
    const token = signToken(user);
    const refreshToken = signRefreshToken(user);

    // Actualizar refresh token
    user.refresh_token = refreshToken;
    user.updated_at = new Date().toISOString();

    // Preparar respuesta (sin datos sensibles)
    const { password_hash, refresh_token, email_verification_token, reset_password_token, reset_password_expires, ...userResponse } = user;

    return res.json({
      token,
      refreshToken,
      user: userResponse
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

async function logout(req, res) {
  try {
    const userId = req.user.sub; 
    
    // Invalidar refresh token
    const user = findUserById(userId);
    if (user) {
      user.refresh_token = null;
      user.updated_at = new Date().toISOString();
    }

    return res.json({ 
      success: true,
      message: "Sesión cerrada exitosamente" 
    });
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token es requerido" });
  }

  try {
    // Verificar refresh token
    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || "secreto_refresh_desarrollo_foco_360"
    );

    // Buscar usuario con ese refresh token
    const allUsers = [...mockUsers, ...registeredUsers];
    const user = allUsers.find(u => u.id === decoded.sub && u.refresh_token === refreshToken);
    
    if (!user) {
      return res.status(401).json({ error: "Refresh token inválido o expirado" });
    }

    // Generar nuevo token de acceso
    const newToken = signToken(user);

    // Preparar respuesta
    const { password_hash, refresh_token, email_verification_token, reset_password_token, reset_password_expires, ...userResponse } = user;

    return res.json({
      token: newToken,
      user: userResponse
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Refresh token inválido o expirado" });
    }
    console.error("Error en refreshToken:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

async function verifyEmail(req, res) {
  const { token } = req.params;

  try {
    // Buscar usuario por token de verificación
    const allUsers = [...mockUsers, ...registeredUsers];
    const userIndex = allUsers.findIndex(u => u.email_verification_token === token);
    
    if (userIndex === -1) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    // Actualizar usuario
    let user;
    if (userIndex < mockUsers.length) {
      mockUsers[userIndex].email_verified = true;
      mockUsers[userIndex].email_verification_token = null;
      mockUsers[userIndex].updated_at = new Date().toISOString();
      user = mockUsers[userIndex];
    } else {
      const registeredIndex = userIndex - mockUsers.length;
      registeredUsers[registeredIndex].email_verified = true;
      registeredUsers[registeredIndex].email_verification_token = null;
      registeredUsers[registeredIndex].updated_at = new Date().toISOString();
      user = registeredUsers[registeredIndex];
    }

    const { password_hash, refresh_token, email_verification_token, reset_password_token, reset_password_expires, ...userResponse } = user;

    return res.json({ 
      success: true,
      message: "Email verificado exitosamente",
      user: userResponse
    });
  } catch (error) {
    console.error("Error en verifyEmail:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email es requerido" });
  }

  try {
    const user = findUserByEmail(email);
    
    if (!user) {
      // No revelar si el email existe
      return res.json({ 
        message: "Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña" 
      });
    }

    // Generar token de restablecimiento
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    // Actualizar usuario
    user.reset_password_token = resetToken;
    user.reset_password_expires = resetTokenExpiry.toISOString();
    user.updated_at = new Date().toISOString();

    // En desarrollo, devolver el token para facilitar pruebas
    const response = { 
      message: "Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña",
    };
    
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      response.resetToken = resetToken;
      response.resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    }

    return res.json(response);
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "La contraseña es requerida" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  try {
    // Buscar usuario por token de restablecimiento
    const allUsers = [...mockUsers, ...registeredUsers];
    const user = allUsers.find(u => 
      u.reset_password_token === token && 
      new Date(u.reset_password_expires) > new Date()
    );

    if (!user) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    // Actualizar contraseña
    const password_hash = await bcrypt.hash(password, 10);
    user.password_hash = password_hash;
    user.reset_password_token = null;
    user.reset_password_expires = null;
    user.refresh_token = null; // Invalidar todos los tokens
    user.updated_at = new Date().toISOString();

    return res.json({ 
      success: true,
      message: "Contraseña restablecida exitosamente" 
    });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.sub;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "La contraseña actual y la nueva son requeridas" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "La nueva contraseña debe tener al menos 6 caracteres" });
  }

  try {
    // Buscar usuario
    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar contraseña actual
    let isValidCurrentPassword = false;
    
    // Para usuarios demo, se acepta "password123"
    const isDemoUser = ['admin@foco360.com', 'estudiante@foco360.com'].includes(user.email);
    if (isDemoUser) {
      isValidCurrentPassword = currentPassword === 'password123';
    } else {
      isValidCurrentPassword = await bcrypt.compare(currentPassword, user.password_hash);
    }

    if (!isValidCurrentPassword) {
      return res.status(401).json({ error: "La contraseña actual es incorrecta" });
    }

    // Hashear nueva contraseña
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.password_hash = newPasswordHash;
    user.refresh_token = null; // Invalidar todos los tokens
    user.updated_at = new Date().toISOString();

    return res.json({ 
      success: true,
      message: "Contraseña cambiada exitosamente" 
    });
  } catch (error) {
    console.error("Error en changePassword:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

async function validateToken(req, res) {
  // El middleware authRequired ya validó el token
  try {
    // Buscar usuario
    const user = findUserById(req.user.sub);
    
    if (!user) {
      return res.status(404).json({ 
        valid: false, 
        error: "Usuario no encontrado" 
      });
    }

    // Preparar respuesta (sin datos sensibles)
    const { password_hash, refresh_token, email_verification_token, reset_password_token, reset_password_expires, ...userResponse } = user;

    return res.json({ 
      valid: true, 
      user: userResponse
    });
  } catch (error) {
    console.error("Error en validateToken:", error);
    return res.status(500).json({ 
      valid: false, 
      error: "Error del servidor" 
    });
  }
}

// Función para resetear datos de prueba (desarrollo)
function resetMockData() {
  registeredUsers = [];
  console.log("📝 Datos mock reseteados para pruebas");
}

module.exports = { 
  register, 
  login, 
  logout,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  validateToken,
  resetMockData // Exportar (pruebas)
};