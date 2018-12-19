const express = require('express');
const session = require('express-session');
const octokit = require('@octokit/rest');
const randomString = require('randomstring');
const dashboardRouter = require('./app/routes/dashboardRouter');
const indexRouter = require('./app/routes/indexRoutes');
const authRouter = require('./app/routes/authRoutes');
const key = require('./app/config/keys');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(
  session({
    secret: randomString.generate(),
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
  })
);

app.get('/auth', authRouter);
app.get('/dashboard', dashboardRouter);
app.use('/app/src/stylesheets/css',express.static(__dirname + '/app/src/stylesheets/css'));
app.use('/app/src/images',express.static(__dirname + '/app/src/images'));
app.use('/app/src/js',express.static(__dirname + '/app/src/js'));
app.get('/', indexRouter);

app.listen(key.keys.port, () => {
  console.log('App working at port ' + key.keys.port);
})