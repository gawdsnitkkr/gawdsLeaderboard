const express = require('express');
const User = require('../models/userModel');

let firstYear=[], secondYear=[], thirdYear=[], fourthYear=[];

const router = express.Router();

User.find({ }, function(err,memberData) {
  if(err) 
    console.log(err);
  else if(memberData.year == 1)
    firstYear.push(memberData);
  else if(memberData.year == 2)
    secondYear.push(memberData);
  else if(memberData.year == 3)
    thirdYear.push(memberData);
  else if(memberData.year == 4)
    fourthYear.push(memberData);
});

router.get('/', (req, res) => {
  res.render('members.ejs', {
    yearOne: firstYear,
    yearTwo: secondYear,
    yearThree: thirdYear,
    yearFour: fourthYear,
    counter: [1,1,1,1]
  });
});

module.exports = router;