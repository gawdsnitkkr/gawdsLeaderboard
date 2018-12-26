const router = require('express').Router();
const octokit = require('../util/octokit');
const request = require('request');
const randomString = require('randomstring');
const User = require('../models/userModel');
const key = require('../config/keys');
const qs = require('querystring');
const url = require('url');

const csrfString = randomString.generate();

router.get('/login', (req, res) => {
  const githubAuthUrl =
    'https://github.com/login/oauth/authorize?' +
    qs.stringify({
      client_id: key.keys.clientId,
      redirect_uri: key.keys.redirectUri,
      state: csrfString,
      scope: 'repos'
    });

  res.redirect(githubAuthUrl);
  console.log('User successfully redirected');
});

router.all('/redirect', (req, res) => {
  console.log('User received');
  const code = req.query.code;
  const returnedState = req.query.state;

  if (returnedState == csrfString) {
    request.post({
      url: 'https://github.com/login/oauth/access_token?' +
        qs.stringify({
          client_id: key.keys.clientId,
          client_secret: key.keys.clientSecret,
          code: code,
          redirect_uri: key.keys.redirectUri,
          state: csrfString
        })
    }, (error, response, body) => {
      // key.keys.accessToken = qs.parse(body).access_token;
      // octokit.authenticate({
      //   type: 'oauth',
      //   token: key.keys.accessToken
      // });
        const accessToken = qs.parse(body).access_token;

        octokit.request('GET /user/repos', {
          headers: {
            'user-agent': key.keys.userAgent,
            authorization: 'token ' + accessToken
          },
        }).then((body) => {
          let userLogin = body.data[0].owner.login;
          console.log(userLogin);
          User.findOne({ "login": userLogin }).then((user) => {
            user.access_token = accessToken;
            res.redirect('/dashboard/:username', {
              username: userLogin
            });
          }).catch((err) => {
            console.log('Database authentication error:' + err);
            res.redirect('/');
          });
        }).catch((err) => {
          console.log(err);
        });

    });
  } else {
    res.redirect('/');
    console.log('An error occured');
  }
});

module.exports = router;