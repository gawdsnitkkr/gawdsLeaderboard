const router = require('express').Router();
const key = require('../config/keys');
const user = require('../models/userModel');
const octokit = require('@octokit/rest')();

router.get('/', (req, res) => {

  //Requests to server
  octokit.request('GET /user/repos', {
    headers: {
      'user-agent': key.keys.userAgent,
      'authorization': 'token ' + key.keys.accessToken,
    },
  }).then((body) => {

    console.log(body.data[0].owner.login);
    // Storing data in database 
    // Check if user already exists in database

  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;