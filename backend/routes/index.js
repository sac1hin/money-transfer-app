const express = require('express');
const router = express.Router();

router.use('/user', require('./users'));
router.use('/account', require('./account'));
 
module.exports = router;