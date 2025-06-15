'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota de busca pública por tag
router.get('/search', userController.findUsersByTag);

// Rotas de registro e login
router.post('/register', userController.register);
router.post('/login', userController.login);

// Rota de perfil (protegida)
router.get('/me', authMiddleware, userController.getProfile);

module.exports = router;