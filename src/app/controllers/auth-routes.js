const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/auth0',
    passport.authenticate('auth0', { scope: 'openid email profile' }), function (req, res) {
        res.redirect('login');
    });

// auth logout
router.get('/logout', (req, res) => {
    res.send('logging out');    
});


//callback route for auth0 to redirect
router.get('/auth0/redirect', passport.authenticate('auth0'), (req,res) => {
    res.send(req.user);
});

module.exports = router;