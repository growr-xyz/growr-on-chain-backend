const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* defining users Schema */
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  education: {
    type: String
  },
  maritalStatus: {
    type: String,
    enum: ['MARRIED', 'SINGLE', 'WIDOWED', 'DIVORCED', 'NOT_SAYING'],
    default: 'NOT_SAYING'
  },
  officialPersonalIncome: {
    type: String // money
  },
  officialHouseholdIncome: {
    type: String // money
  },
  unofficialHouseholdIncome: {
    type: String // money
  },
  householdExpenses: {
    type: String // money
  },
  dependants: {
    type: String // money
  },
  score: {
    type: String // money
  },
  goals: [{
    type: mongoose.Types.ObjectId,
    ref: 'Goal'
  }],
  courses: [{
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  }],
  wallet: {
    type: String,
    required: true
  },
  accountIds: {
    type: [String]
  }
});
module.exports = mongoose.model('User', userSchema);