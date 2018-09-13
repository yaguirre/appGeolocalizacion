const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const keys = require('./keys');
const User = require('../app/models/user');


console.log("ENTRA A PASSPORT SETUP");
fdsfasdfasdfasdfsa
passport.use(
    fdsafdasfasdf4324325
    new Auth0Strategy({
        domain: 'marami21.auth0.com',
        callbackURL: '/auth/auth0/redirect', //sitio al que se redirecciona
        clientID: keys.auth0.clientID,
        //clientSecret: keys.auth0.clientSecret
        clientSecret:"fdsfasdf"
    }, () => {
        console.log("function fired")
    })
);