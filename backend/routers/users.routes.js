const express = require('express')
const router = express.Router()
const controladorUser = require('../controllers/users.controlador')


router.post('/', controladorUser.crearUser)
router.get('/', controladorUser.mostrarUsers)
router.put('/:id', controladorUser.editarUser)
router.delete('/:id', controladorUser.borrarUser)


module.exports = router;

//Los metodos que vienen acompañados de un id se ejecutarán cuando el id aparezca en la URL del metodo GET, ejemplo:
//
