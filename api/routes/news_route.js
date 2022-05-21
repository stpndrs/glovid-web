const express = require('express')
const router = express.Router()
const newsController = require('../controllers/news_controller')

router.get('/covid19', newsController.findAllCovid19)

module.exports = router
