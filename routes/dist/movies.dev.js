"use strict";

var express = require('express');

var router = express.Router();

var postController = require('../controllers/posts');

router.get('/', postController.getAll);
router.post('/', postController.create);
router.get('/:postId', postController.getById);
router.put('/:postId', postController.updateById);
router["delete"]('/:postId', postController.deleteById);
module.exports = router;