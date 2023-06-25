const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
	userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  searchAddress: {
    type: String,
    required: true
  }
});


const Search = mongoose.model('Search', searchSchema);
module.exports = Search;