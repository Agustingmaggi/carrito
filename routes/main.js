const express = require('express')
const router = express.Router()
const {home,addCart,deleteCart} = require('../controllers/main')

router.get('/', home)

router.post('/agregar',addCart)
router.post('/eliminar', deleteCart)

module.exports = router