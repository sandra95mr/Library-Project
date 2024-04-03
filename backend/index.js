const app = require('./app')

app.listen(app.get('port'), ()=>{
    console.log('Server en ejecucion en el puerto ',app.get('port'))
})

