const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const keys = require('./keys');
const User = require('../app/models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new Auth0Strategy({
        domain: 'marami21.auth0.com',
        callbackURL: '/auth/auth0/redirect', //sitio al que se redirecciona
        clientID: keys.auth0.clientID,
        clientSecret: keys.auth0.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log('passport callback function fired')
        console.log(profile);
        //console.log('email: ', profile.email);


        //check if user already exists in our db
        User.findOne({ auth0Id: profile.id }).then((currentUser) => {
            if (currentUser) {
                // Already have the user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    username: profile.displayName,
                    auth0Id: profile.id,
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
        
    })
);