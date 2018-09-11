const router = require('express').Router();

router.get('/login', (req,res) => {
    res.render('login')
});

router.get('/logout', (req,res) => {
    res.send('logging out')
});

router.get('/auth0', (req,res) => {
    //passporta
    res.send('logging in with auth0')
});

module.exports = router;


