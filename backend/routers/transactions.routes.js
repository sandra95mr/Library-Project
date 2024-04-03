const express = require('express')
const router = express.Router()
const controladorTransaction = require('../controllers/transactions.controlador')

router.get('/', controladorTransaction.getTransactions)
router.get('/:userId', controladorTransaction.getTransactionByUser)
router.post('/', controladorTransaction.createTransaction)


module.exports = router;