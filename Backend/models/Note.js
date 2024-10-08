const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String, // Use 'String' with a capital 'S'
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'General'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', NoteSchema);
