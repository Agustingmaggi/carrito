const express = require('express')
const router = express.Router()
const {home} = require('../controllers/main')

router.get('/', home)

module.exports = router