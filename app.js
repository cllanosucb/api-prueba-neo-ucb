const express = require('express') //llamamos a Express

var app = express()               

var port = process.env.PORT || 3000  // establecemos nuestro puerto

// para establecer las distintas rutas, necesitamos instanciar el express router
var router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//configuracion global de rutas
app.use('/api/neo', require('./server/routes/index'))

// iniciamos nuestro servidor
app.listen(port, () => {
    console.log('API escuchando en el puerto ' + port)
})

