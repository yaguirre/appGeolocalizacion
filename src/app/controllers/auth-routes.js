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


router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')

});
    // auth logout
/*router.get('/logout', (req, res) => {
    //hadle with passport
    //res.send('logging out');
    //localStorage.removeItem('expires_at');
    res.send("you are logging out");
    
});*/


// auth with google
router.get('/auth0', passport.authenticate('auth0', {
    scope: ['profile']
}));



// callback route for google to redirect to
router.get('/auth0/redirect', passport.authenticate('auth0'), (req, res) => {
    //res.send(req.user);
    res.redirect('/profile');

    //res.send('you reached the callback URI');
})




module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}
