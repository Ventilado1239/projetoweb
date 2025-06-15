'use strict';
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// Aplica o middleware de autenticação a todas as rotas deste arquivo
router.use(authMiddleware);

// Rota para buscar a conversa com um usuário específico
router.get('/:userId', messageController.getConversation);

// Rota para enviar uma mensagem para um usuário específico
router.post('/:userId', messageController.sendMessage);

module.exports = router;