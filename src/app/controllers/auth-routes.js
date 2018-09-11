const router = require('express').Router();
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
    res.redirect('/index/');
});



module.exports = router;