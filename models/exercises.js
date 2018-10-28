'use strict';

let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Exercises = new Schema({
  description: {
    type: String,
    required: true,
    maxLength: [20, 'description too long']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'duration too short']
  },
  date: {
    type: Date,
    default: Date.now
  },
  username: String,
  userId: {
    type: String,
    ref: 'Users',
    index: true
  }
});

module.exports = mongoose.model('Exercises', Exercises);