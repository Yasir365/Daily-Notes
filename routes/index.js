var express = require('express');
var router = express.Router();
const authroutes = require('./auth');
const todoroutes = require('./todo');

router.use('/auth', authroutes);
router.use('/todo', todoroutes);

module.exports = router;
