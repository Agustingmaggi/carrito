const express = require('express')
const router = express.Router()
const {home,addCart,deleteCart,checkout,feedback} = require('../controllers/main')

router.get('/', home)
router.get('/checkout', feedback)

router.post('/agregar',addCart)
router.post('/eliminar', deleteCart)

router.post('/checkout', checkout)

module.exports = router