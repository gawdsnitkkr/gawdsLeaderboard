const router = require('express').Router();
const key = require('../config/keys');
const user = require('../models/userModel');
const octokit = require('../util/octokit');

router.get('/', (req, res) => {

  //Requests to server
  octokit.repos.list().then(result => {

    // Storing data in database 
    // Check if user already exists in database
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;