const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const keys = require('./keys');
const User = require('../app/models/user');


console.log("ENTRA A PASSPORT SETUP");
passport.use(
    new Auth0Strategy({
        domain: 'marami21.auth0.com',
        callbackURL: '/auth/auth0/redirect',
        clientID: keys.auth0.clientID,
        clientSecret: keys.auth0.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        console.log("function fired")
        console.log(profile)
    })
);