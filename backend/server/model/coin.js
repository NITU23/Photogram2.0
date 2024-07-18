const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  // Define schema fields based on API response
  // Example:
  name: String,
  symbol: String,
  price: Number,
  // Add more fields as per your API response
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
