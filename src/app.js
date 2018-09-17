const express  = require('express');
const app = express();
const authRoutes = require('./app/controllers/auth-routes');
const path = require('path');   //Permite manejar las rutas de las carpetas dentro del servidor y del SO
const mongoose = require('mongoose'); // Permite realizar la conexión a mongodb
const passport = require('passport');  //Permite definir la conexión de como autenticarnos
const flash = require('connect-flash');
const morgan = require('morgan'); // Permite definir los métodos http que llegan al servidor y mostrarlos por consola
const cookieParser = require('cookie-parser'); // Modulo para poder administrar las cookies
const bodyParser = require('body-parser'); //Permite procesar la información del navegador
const session = require('express-session');
const passportSetup = require('./config/passport-setup');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const config = require('./config/database.js');
//mongoose.connect(config.db, {});

//require('./config/passport-setup')(passports);
//require('./config/passport')(passport);

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  
})); 

var sess = {
    secret: 'CHANGE THIS SECRET',
    cookie: {},
    resave: false,
    saveUninitialized: true
};
app.use(session(sess));
if (app.get('env') === 'production') {
    sess.cookie.secure = true; // serve secure cookies, requires https
}

// Middlewares
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});


app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));
 
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('index');
});



app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* DESCOMENTAR
var sess = {
    secret: 'CHANGE THIS SECRET',
    cookie: {},
    resave: false,
    saveUninitialized: true
  };
  app.use(session(sess));
  if (app.get('env') === 'production') {
    sess.cookie.secure = true; // serve secure cookies, requires https
  }
*/
/*
app.use(session({
    secret: 'OHalsjjdflsslrwjs',
    resave: false,
    saveUninitialized: false
}));
*/


app.use(flash());

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});


// Routes
require('./app/controllers/routes.js')(app,passport);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'),() => {
    console.log('server on port', app.get('port'));
});