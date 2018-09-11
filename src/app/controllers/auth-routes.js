const router = require('express').Router();

router.get('/login', (req,res) => {
    res.render('login')
});

app.get('/logout', (req,res) => {
    res.send('logging out')
});

app.get('/auth0', (req,res) => {
    //passporta
    res.send('logging in with auth0')
});

module.exports = router;


