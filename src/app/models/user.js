const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema del usuario en la base de datos
const userSchema = new mongoose.Schema({
    username: String,
    auth0id: String,
    name: String
});

module.exports = mongoose.model('User', userSchema);


