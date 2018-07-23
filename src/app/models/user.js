const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String    
    },
});

// Genera un hash para encriptar la contraseña
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Valida la contraseña
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}

//Crea el modelo para el usuario    
module.exports = mongoose.model('User', userSchema);

