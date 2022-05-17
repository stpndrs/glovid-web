const express = require('express')
const router = express.Router()

const statsController = require('../controllers/stats_controller')

router.get('/global', statsController.global)
router.get('/indonesia', statsController.indonesia)

module.exports = router
