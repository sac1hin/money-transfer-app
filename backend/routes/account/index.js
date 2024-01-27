const express = require('express');
const router = express.Router();
const accountController = require('../../controller/account');
const validateUser = require('../../validators/user.validator');
const authMiddleware = require('../../middleware/middleware');

router.get('/balance', authMiddleware, accountController.Balance);

router.post('/transfer', authMiddleware, accountController.Transfer);

module.exports = router;