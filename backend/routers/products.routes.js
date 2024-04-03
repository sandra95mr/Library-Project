const express = require('express')
const router = express.Router()
const controladorProduct = require('../controllers/products.controlador')

router.get('/', controladorProduct.mostrarProducts)
router.get('/:id', controladorProduct.mostrarProduct)
router.post('/', controladorProduct.crearProduct)
router.put('/:id', controladorProduct.editarProduct)
router.delete('/:id', controladorProduct.borrarProduct)

module.exports = router;

//Los metodos que vienen acompañados de un id se ejecutarán cuando el id aparezca en la URL del metodo GET, ejemplo:
//
