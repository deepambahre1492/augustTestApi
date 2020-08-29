"use strict";

var postModel = require('../models/posts');

module.exports = {
  getById: function getById(req, res, next) {
    console.log(req.body);
    postModel.findById(req.params.postId, function (err, postInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Post found!!!",
          data: {
            posts: postInfo
          }
        });
      }
    });
  },
  getAll: function getAll(req, res, next) {
    var postsList = [];
    postModel.find({}, function (err, posts) {
      if (err) {
        next(err);
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var post = _step.value;
            postsList.push({
              id: post._id,
              Title: post.Title,
              Description: post.Description,
              Author: post.Author
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        res.json({
          status: "success",
          message: "posts list found!!!",
          data: {
            posts: postsList
          }
        });
      }
    });
  },
  updateById: function updateById(req, res, next) {
    postModel.findByIdAndUpdate(req.params.postId, {
      Title: req.body.Title
    }, function (err, postInfo) {
      if (err) next(err);else {
        res.json({
          status: "success",
          message: "Post updated successfully!!!",
          data: null
        });
      }
    });
  },
  deleteById: function deleteById(req, res, next) {
    postModel.findByIdAndRemove(req.params.postId, function (err, postInfo) {
      if (err) next(err);else {
        res.json({
          status: "success",
          message: "Post deleted successfully!!!",
          data: null
        });
      }
    });
  },
  create: function create(req, res, next) {
    postModel.create({
      Title: req.body.Title,
      Description: req.body.Description,
      Author: req.body.Author
    }, function (err, result) {
      if (err) next(err);else res.json({
        status: "success",
        message: "Post added successfully!!!",
        data: result
      });
    });
  }
};