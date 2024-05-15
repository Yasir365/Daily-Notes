var express = require('express');
var router = express.Router();
const authroutes = require('./auth.routes.js');
const todoroutes = require('./todo.routes.js');

router.use('/auth', authroutes);
router.use('/todo', todoroutes);

module.exports = router;
