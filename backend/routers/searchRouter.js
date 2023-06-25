const express = require('express');
const Search = require('../models/searchModel.js');
const User = require('../models/userModel.js');

const searchRouter = express.Router();

searchRouter.post('/search', async (req, res) => {
  const user = await User.findById(req.cookies['userId']);

  if (user) {
    const exists = await Search.find({
      userId: user._id,
      searchAddress: req.body.address
    });
  
    if (exists.length === 0) {
      const search = new Search({
        userId: user._id,
        searchAddress: req.body.address
      });
      await search.save();
    }
  }

  res.status(200).json(selectHours());
});

searchRouter.get('/allsearch', async (req, res) => {
  const user = await User.findById(req.cookies['userId']);

  if (user) {
    const searches = await Search.find({ userId: user._id });
    return res.status(200).json(searches);
  }
  return res.status(401).json({
    "message": "You are not logged in"
  });
});

function selectHours() {
  const hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

  let result1 = Math.floor(Math.random() * hours.length);
  let result2 = Math.floor(Math.random() * hours.length);
  let flag = Math.floor(Math.random() * hours.length) % 2;

  let result = [result1, result2].sort((a, b) => a - b);
  return [result, flag];
}

module.exports.searchRouter = searchRouter;
