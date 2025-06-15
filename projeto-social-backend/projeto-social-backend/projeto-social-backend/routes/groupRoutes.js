'use strict';
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, groupController.createGroup);
router.get('/', groupController.getAllGroups);
router.post('/:groupId/join', authMiddleware, groupController.joinGroup);

module.exports = router;