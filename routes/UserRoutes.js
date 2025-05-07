const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const verifyToken = require('../config/authMiddleware');

router.post('/login', userController.loginUser);
router.post('/', userController.createUser);

router.delete('/logout', verifyToken, userController.logoutUser);
router.get('/', verifyToken, userController.getAllUsers);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;