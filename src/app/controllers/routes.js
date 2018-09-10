const Location = require('../models/location');

module.exports = (app, passport) => {

    app.get('/', (req,res) => {
        res.render('index');
    });


    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });

    app.get('/getUsername',isLoggedIn,(req, res) => {
        res.json({username: req.user.email});
    })

    app.get('/getLocations', isLoggedIn, (req, res) => {
        Location.find({user:req.user.email},function(err, locations){
            res.json({locations:locations});
        });
    });

    app.post('/location', (req, res) => {
        let location = new Location()
        console.log(req.body)
        location.user = req.body.email
        console.log("LLegue al post")
        location.latitude = req.body.latitude
        location.longitude = req.body.longitude
        console.log(location.user)
        console.log(location.latitude)
        console.log(location.longitude)

        location.save((err, LocationStored)=>{
            if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        })

        res.json({message: "Exitasion"});
    });

    app.get('/login', (req,res) => {
        res.render('login')
    });
    
    app.get('/logout', (req,res) => {
        res.send('logging out')
    });
    
    app.get('/google', (req,res) => {
        //passporta
        res.send('logging in with google')
    });
    
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}