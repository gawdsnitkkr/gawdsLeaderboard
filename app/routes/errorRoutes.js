const router = require('express').Router();

router.get('/error', (req, res) => {
  res.render('404page.ejs');
});

module.exports = router;