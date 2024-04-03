const express = require('express') //Requiero el modulo y lo guardo en un objeto
const app = express() //El objeto app nos permite usar los metodos de express
const morgan = require('morgan')
const mongoose = require('./database.js')
const cors = require('cors') //Este modulo nos permite aceptar requests que vienen de otros servidores
//Settings

app.set('port', process.env.PORT || 3000)  //variable de entorno- si no hay ningun puerto definido para la aplicacion utiliza el 3000

//Middleware
app.use(cors())
app.use(morgan('dev')) //Escucha las peticiones que van llegando y las muestra por consola
app.use(express.json()) //Para que express pueda entender objetor con el Contet Type JSON
app.use(express.urlencoded({extended:false})) //Para que express pueda entender los datos que vienen de formularios HTML

//routes

app.use("/api/products", require('./routers/products.routes'));

app.use("/api/users", require('./routers/users.routes'))

app.use("/api/transactions", require('./routers/transactions.routes'));

//Incializacion del server


module.exports = app