'use strict';
let shortid = require('shortid');

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Users = new Schema({
  username: { 
    type: String,
    required: true, 
    unique: true,
    maxlength: [20, 'username too long']
  },
  _id:{
    type: String,
    index: true,
    default: shortid.generate
  }
});

module.exports = mongoose.model('Users', Users);