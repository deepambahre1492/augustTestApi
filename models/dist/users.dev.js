"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var saltRounds = 10; //Define a schema

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
});
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model('User', UserSchema);