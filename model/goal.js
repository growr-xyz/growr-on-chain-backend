const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const goalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  availableAmount: {
    type: String,
    required: true
  },
  amountToBorrow: {
    type: String
  },
  duration: {
    type: String
  },
  isAchieved: {
    type: Boolean,
    default: false
  },
  loan: {
    type: mongoose.Types.ObjectId,
    ref: 'Loan'
  }
});
module.exports = mongoose.model('Goal', goalSchema);