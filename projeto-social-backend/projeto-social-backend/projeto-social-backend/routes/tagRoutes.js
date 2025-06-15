'use strict';
const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para um usuário logado adicionar/atualizar suas tags
router.post('/', authMiddleware, tagController.addTagsToUser);

module.exports = router;