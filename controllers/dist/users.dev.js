"use strict";

var userModel = require('../models/users');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

module.exports = {
  signup: function signup(req, res, next) {
    userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, function (err, result) {
      if (err) next(err);else res.json({
        status: "success",
        message: "User added successfully!!!",
        data: result
      });
    });
  },
  login: function login(req, res, next) {
    userModel.findOne({
      email: req.body.email
    }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
          var token = jwt.sign({
            id: userInfo._id
          }, req.app.get('secretKey'), {
            expiresIn: '1h'
          });
          res.json({
            status: "success",
            message: "user found!!!",
            data: {
              user: userInfo,
              token: token
            }
          });
        } else {
          res.json({
            status: "error",
            message: "Invalid email/password!!!",
            data: userInfo
          });
        }
      }
    });
  }
};