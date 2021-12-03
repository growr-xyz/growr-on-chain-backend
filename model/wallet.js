const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const walletSchema = new Schema({
  address: {
    type: String,
    required: true,
    index: true
  },
  vendor: {
    type: String,
    required: true
  },
  network: {
    type: String
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});
module.exports = mongoose.model('Wallet', walletSchema);