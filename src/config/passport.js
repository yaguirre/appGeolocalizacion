const localStrategy = require('passport-local').Strategy; 

const User = require('../app/models/user');


module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);    
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user){
            done(err,user);
        });
    });

    //Método que permite registrar
    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, email, password, done) {
        console.log("Llegue a la función de passport");
        User.findOne({'email': email}, function (err, user) {
            if (err) { 
                return done(err);
                console.log("ocurrio un error");
            }
            if (user) { 
                return done(null, false, req.flash('signupMessage', 'The email is already taken.'));
            } else {
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.save(function (err) {
                    if (err) {throw err; }
                    console.log("Salvo el usuario");
                    return done(null, newUser);
                });
            }
        });
        console.log("Logre salir");
    }));

    //Método que permite loguearse
    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, email, password, done) {
        User.findOne({'email': email}, function (err, user) {
            if (err) { return done(err);}
            if (!user) { 
                return done(null, false, req.flash('loginMessage', 'No User found.'))
            } 
            if (!user.validatePassword(password)){
                return done(null, false, req.flash('loginMessage', 'Wrong password'));
            }
            return  done(null, user);
        });
    }));
}