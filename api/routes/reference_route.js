const express = require('express')
const { getListHospital } = require('../controllers/reference_controller')
const router = express.Router()

router.get('/hospital', getListHospital)

module.exports = router
