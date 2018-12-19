const Router = require('express').Router();

Router.get('/', (req, res) => {
  res.render('index.ejs');
})

module.exports = Router;