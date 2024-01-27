const express = require('express');
const router = express.Router();
const userController = require('../../controller/users');
const validateUser = require('../../validators/user.validator');
const authMiddleware = require('../../middleware/middleware');

router.post('/sign-up', validateUser, userController.SignUp);
router.post('/login', userController.Login);

router.get('/profile', authMiddleware, userController.Profile);

router.put('/', authMiddleware, userController.UpdateProfile);

router.get('/bulk', authMiddleware, userController.FilterByName);



module.exports = router;