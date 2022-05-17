const express = require('express')
const router = express.Router()

const statsController = require('../controllers/stats_controller')
const vaccinationController = require('../controllers/vaccination_controller')

router.get('/global', statsController.global)
router.get('/indonesia', statsController.indonesia)
router.get('/vaccination', vaccinationController.covidGoID)
router.get('/stats_provinces', statsController.statsByProvince)

module.exports = router
