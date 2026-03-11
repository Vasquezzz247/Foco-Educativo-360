const pool = require("../db/pool");

// Obtener perfil del usuario autenticado
async function getUserProfile(req, res) {
  try {
    const userId = req.user.sub;

    const result = await pool.query(
      `SELECT id, name, email, phone, bio, role, avatar_url, 
              email_verified, created_at, updated_at
       FROM users 
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    return res.json({ user });
  } catch (error) {
    console.error("Error en getUserProfile:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

// Actualizar perfil del usuario autenticado
async function updateUserProfile(req, res) {
  try {
    const userId = req.user.sub;
    const { name, phone, bio, avatar_url } = req.body;

    // Validar que al menos un campo sea proporcionado
    if (!name && !phone && !bio && !avatar_url) {
      return res.status(400).json({ 
        error: "Debe proporcionar al menos un campo para actualizar" 
      });
    }

    // Construir la consulta dinámicamente
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }

    if (phone !== undefined) {
      updates.push(`phone = $${paramCount}`);
      values.push(phone || null); // Permitir establecer null
      paramCount++;
    }

    if (bio !== undefined) {
      updates.push(`bio = $${paramCount}`);
      values.push(bio || null);
      paramCount++;
    }

    if (avatar_url !== undefined) {
      updates.push(`avatar_url = $${paramCount}`);
      values.push(avatar_url || null);
      paramCount++;
    }

    // Agregar updated_at y user id
    updates.push(`updated_at = NOW()`);
    values.push(userId);

    const query = `
      UPDATE users 
      SET ${updates.join(", ")}
      WHERE id = $${paramCount}
      RETURNING id, name, email, phone, bio, role, avatar_url, 
                email_verified, created_at, updated_at
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ 
      success: true,
      message: "Perfil actualizado exitosamente",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Error en updateUserProfile:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

// Obtener usuario por ID (para administradores o ver perfiles públicos)
async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const currentUser = req.user;

    // Determinar qué campos devolver según permisos
    let fields = "id, name, avatar_url, bio, role, created_at";
    
    // Si es el propio usuario o admin, mostrar más información
    if (currentUser.sub === userId || currentUser.role === 'admin') {
      fields = "id, name, email, phone, bio, role, avatar_url, email_verified, created_at, updated_at";
    }

    const result = await pool.query(
      `SELECT ${fields}
       FROM users 
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error("Error en getUser:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

// Listar usuarios (para administradores)
async function listUsers(req, res) {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT id, name, email, role, avatar_url, created_at
      FROM users
      WHERE 1=1
    `;
    const queryParams = [];
    let paramCount = 1;

    // Filtrar por rol
    if (role) {
      query += ` AND role = $${paramCount}`;
      queryParams.push(role);
      paramCount++;
    }

    // Buscar por nombre o email
    if (search) {
      query += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    // Contar total
    const countQuery = query.replace(
      'SELECT id, name, email, role, avatar_url, created_at',
      'SELECT COUNT(*) as total'
    );
    
    const countResult = await pool.query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].total);

    // Agregar paginación
    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    queryParams.push(parseInt(limit), offset);

    const result = await pool.query(query, queryParams);

    return res.json({
      users: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error en listUsers:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

// Actualizar usuario (para administradores)
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, phone, bio, role, avatar_url, email_verified } = req.body;
    const currentUser = req.user;

    // Solo administradores pueden actualizar otros usuarios
    if (currentUser.role !== 'admin' && currentUser.sub !== userId) {
      return res.status(403).json({ error: "No autorizado" });
    }

    // Construir consulta dinámica
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }

    if (email !== undefined) {
      updates.push(`email = $${paramCount}`);
      values.push(email.toLowerCase());
      paramCount++;
    }

    if (phone !== undefined) {
      updates.push(`phone = $${paramCount}`);
      values.push(phone || null);
      paramCount++;
    }

    if (bio !== undefined) {
      updates.push(`bio = $${paramCount}`);
      values.push(bio || null);
      paramCount++;
    }

    if (role !== undefined && currentUser.role === 'admin') {
      updates.push(`role = $${paramCount}`);
      values.push(role);
      paramCount++;
    }

    if (avatar_url !== undefined) {
      updates.push(`avatar_url = $${paramCount}`);
      values.push(avatar_url || null);
      paramCount++;
    }

    if (email_verified !== undefined && currentUser.role === 'admin') {
      updates.push(`email_verified = $${paramCount}`);
      values.push(email_verified);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar" });
    }

    updates.push(`updated_at = NOW()`);
    values.push(userId);

    const query = `
      UPDATE users 
      SET ${updates.join(", ")}
      WHERE id = $${paramCount}
      RETURNING id, name, email, phone, bio, role, avatar_url, 
                email_verified, created_at, updated_at
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ 
      success: true,
      message: "Usuario actualizado exitosamente",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Error en updateUser:", error);
    
    if (error.code === "23505") {
      return res.status(409).json({ error: "El email ya está en uso" });
    }
    
    return res.status(500).json({ error: "Error del servidor" });
  }
}

// Eliminar usuario (para administradores o el propio usuario)
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const currentUser = req.user;

    // Solo administradores pueden eliminar otros usuarios
    if (currentUser.role !== 'admin' && currentUser.sub !== userId) {
      return res.status(403).json({ error: "No autorizado" });
    }

    const result = await pool.query(
      `DELETE FROM users 
       WHERE id = $1 
       RETURNING id, name, email`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ 
      success: true,
      message: "Usuario eliminado exitosamente",
      deletedUser: result.rows[0]
    });
  } catch (error) {
    console.error("Error en deleteUser:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUser,
  listUsers,
  updateUser,
  deleteUser
};