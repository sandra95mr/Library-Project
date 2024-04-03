const  mongoose  = require("mongoose");

const{Schema} = mongoose
const productEsquema = new Schema({

    titulo:{type:String, required: true},
    paginas:{type:Number, required: true},
    genero:{type:String, required: true},
    descripcion:{type:String, required: true},
    precio:{type:Number, required: true},
    stock:{type:Number, required: true},
    ruta:{type:String, required: true}

},{
    versionKey:false

}); //creo objeto


module.exports = mongoose.model('Product', productEsquema)


