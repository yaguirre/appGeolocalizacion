const express  = require('express');
const app = express();

const path = require('path');   //Permite manejar las rutas de las carpetas dentro del servidor y del SO
const mongoose = require('mongoose'); // Permite realizar la conexión a mongodb
const passport = require('passport');  //Permite definir la conexión de como autenticarnos
const flash = require('connect-flash');
const morgan = require('morgan'); // Permite definir los métodos http que llegan al servidor y mostrarlos por consola
const cookieParser = require('cookie-parser'); // Modulo para poder administrar las cookies
const bodyParser = require('body-parser'); //Permite procesar la información del navegador
const session = require('express-session');

const config = require('./config/database.js');

mongoose.connect(config.db, {
    useMongoClient: true
});

require('./config/passport')(passport);

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'OHalsjjdflsslrwjs',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./app/controllers/routes.js')(app,passport);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'),() => {
    console.log('server on port', app.get('port'));
});