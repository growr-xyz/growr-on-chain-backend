const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Course', courseSchema);