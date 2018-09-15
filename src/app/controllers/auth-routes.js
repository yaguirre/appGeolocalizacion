const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('login')
})
/*router.get('/login',
    passport.authenticate('auth0', { scope: 'openid email profile' }), function (req, res) {
        res.redirect('login');
    });
*/

// auth logout
router.get('/logout', (req, res) => {
    res.send('logging out');    
});

// auth with auth0
router.get('/auth0', passport.authenticate('auth0', {
    scope: ['profile']
}));

//callback route for auth0 to redirect
router.get('/auth0/redirect', passport.authenticate('auth0'), (req,res) => {
    res.send("YOU REACHED THE CALLBACK");
});

module.exports = router;