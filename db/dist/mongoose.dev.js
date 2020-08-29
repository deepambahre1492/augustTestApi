"use strict";

var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://deepam:deepam12345@postapi.ihaqs.azure.mongodb.net/PostApi?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('connected to database');
})["catch"](function (err) {
  console.log('failed connected to database', err);
});