const express = require('express');
const session = require('express-session');
const randomString = require('randomstring');
const bodyParser = require('body-parser');
const path = require('path');

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
    cookie: {
      maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'app', 'src')));

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.get('/', indexRouter);

app.get('/name/:name', callName); 
  
function callName(req, res) { 
      
    // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["./user.py", 
                            req.params.name]); 
                          
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
} 


app.listen(key.keys.port, () => {
  console.log('App working at port ' + key.keys.port);
});