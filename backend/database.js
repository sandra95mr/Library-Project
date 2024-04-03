const  mongoose  = require('mongoose') //mongoose nos permite fijar un esquema a nuestra base de datos
const URL = 'mongodb://127.0.0.1:27017/proyecto'

mongoose.connect(URL, {
    useUnifiedTopology:true,  //estas dos lineas para quitar informacion que nos suelta el moongose
    useNewUrlParser:true
})
.then(db => console.log('La DB está conectada'))
.catch(err =>console.error(err))

module.exports = mongoose