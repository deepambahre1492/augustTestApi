"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var Post = require('./post');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    "default": 0,
    validate: function validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid!');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    validate: function validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error('Please enter your password!');
      } else if (validator.equals(value.toLowerCase(), "password")) {
        throw new Error('Password is invalid!');
      } else if (validator.contains(value.toLowerCase(), "password")) {
        throw new Error('Password should not contain password!');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

UserSchema.statics.checkValidCredentials = function _callee(email, password) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 2:
          user = _context.sent;

          if (user) {
            _context.next = 5;
            break;
          }

          throw new Error('Unable to login 2');

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 7:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 10;
            break;
          }

          throw new Error('Unable to login 2');

        case 10:
          return _context.abrupt("return", user);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

UserSchema.methods.newAuthToken = function _callee2() {
  var user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;
          token = jwt.sign({
            _id: user.id.toString()
          }, "thisiskey");
          user.tokens = user.tokens.concat({
            token: token
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(user.save());

        case 5:
          return _context2.abrupt("return", token);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
}; //hash the plain text password before saving


UserSchema.pre('save', function _callee3(next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = this;

          if (!user.isModified('password')) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context3.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
});
UserSchema.pre('remove', function _callee4(next) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = this;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.deleteMany({
            author: user._id
          }));

        case 3:
          next();

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this);
});
var User = mongoose.model('User', UserSchema);
module.exports = User;