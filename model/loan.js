const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loanSchema = new Schema({
  amount: {
    type: String
  },
  apr: {
    type: String // find percentage schema
  },
  duration: {
    type: String
  },
  instalment: {
    type: String
  },
  nextInstalmentDue: {
    type: Date
  },
  lastInstalmentDue: {
    type: Date
  },
  totalToRepay: {
    type: String
  },
  totalInterest: {
    type: String
  }

});
module.exports = mongoose.model('Loan', loanSchema);