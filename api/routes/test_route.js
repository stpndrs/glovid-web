const express = require('express')
const router = express.Router()

const { firstTest } = require('../controllers/test_controller')

router.get('/a', firstTest)

module.exports = router
