const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

//Esquema del usuario en la base de datos
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

// Genera un hash para encriptar la contraseña
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Valida la contraseña
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

//Crea el modelo para el usuario    
module.exports = mongoose.model('User', userSchema);

