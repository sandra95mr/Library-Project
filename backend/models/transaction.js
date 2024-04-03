const  mongoose  = require("mongoose");

const{Schema} = mongoose

const transactionEsquema = new Schema({

    user_id:{type:String, required: true},
    total:{type:Number, required: true},
    products:{type:Array, required: true}

},{
    versionKey:false

}); //creo objeto


module.exports = mongoose.model('Transaction', transactionEsquema);
