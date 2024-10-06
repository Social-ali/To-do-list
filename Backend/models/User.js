const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema for user
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model from the schema, specifying the collection name 'users'
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
