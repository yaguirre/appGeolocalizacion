const router = require('express').Router();
const passport = require('passport');
//var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

/*
router.get('/login', (req, res) => {
    res.render('login');
});
*/

router.get('/login',
    passport.authenticate('auth0', { scope: 'openid email profile' }), function (req, res) {
        res.redirect('login');
    });

// auth logout
router.get('/logout', (req, res) => {
    //hadle with passport
    //res.send('logging out');
    //localStorage.removeItem('expires_at');
    req.logout();
    res.redirect('/');
    
});

// CAMBIAR!!!
// auth with google
router.get('/auth0', passport.authenticate('auth0', {
    scope: ['profile']
}));


/*
router.get('/auth0', (req, res) => {
   res.send('logging in with outh0')
});
*/

// callback route for google to redirect to
/*router.get('/auth0/redirect', passport.authenticate('auth0'), (req, res) => {
    //res.send(req.user);
    res.redirect('/index/');

    //res.send('you reached the callback URI');
})
*/


/*const router = require('express').Router();
const passport = require('passport');


router.get('/login',
    passport.authenticate('auth0', { scope: 'openid email profile' }), function (req, res) {
        res.redirect('login');
    });


// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    
});

//login with auth0
router.get('/auth0', passport.authenticate('auth0', {
    scope: ['profile']
}));


// callback route for auth0 e to redirect to
router.get('/auth0/redirect', passport.authenticate('auth0'), (req, res) => {
    //res.send(req.user);
    //res.redirect('/index/');
    console.log("ACAAAAAAAAA")
    res.redirect('/')
});*/




module.exports = router;