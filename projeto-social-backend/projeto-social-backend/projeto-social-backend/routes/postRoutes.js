'use strict';
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para criar um post (protegida)
router.post('/', authMiddleware, postController.createPost);

// Rota para listar todos os posts (pública)
router.get('/', postController.getAllPosts);

// Rota para adicionar um comentário a um post específico (protegida)
router.post('/:postId/comments', authMiddleware, postController.addComment);

// Rota para avaliar um post (protegida)
router.post('/:postId/rate', authMiddleware, postController.ratePost);

module.exports = router;