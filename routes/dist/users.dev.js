"use strict";

var express = require('express');

var router = express.Router();

var userController = require('../controllers/users');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
module.exports = router;