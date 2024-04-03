const  mongoose  = require("mongoose");

const{Schema} = mongoose
const userEsquema = new Schema({

    nombre:{type:String, required: true},
    ciudad:{type:String, required: true},
    email:{type:String, required: true},
    contrasenia:{type:String, required: true},

},{
    versionKey:false

}); //creo objeto


module.exports = mongoose.model('User', userEsquema)
