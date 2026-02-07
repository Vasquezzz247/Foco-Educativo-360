const router = require("express").Router();
const { 
  listUsers, 
  getUser, 
  updateUser,
  updateUserProfile,
  deleteUser,
  getUserProfile 
} = require("../controllers/users.controller");
const { authRequired } = require("../middlewares/auth");

// Obtener perfil autenticado
router.get("/profile", authRequired, getUserProfile);

// actualizar perfil autenticado
router.put("/profile", authRequired, updateUserProfile);

// CRUD general (para admins)
router.get("/", authRequired, listUsers);
router.get("/:id", authRequired, getUser);
router.put("/:id", authRequired, updateUser);
router.delete("/:id", authRequired, deleteUser);

module.exports = router;