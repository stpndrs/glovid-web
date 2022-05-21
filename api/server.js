require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.SERVER_PORT || 5000
const cors = require('cors')

app.use(express.static('api/public'))
app.use(cors())

app.use('/api/news', require('./routes/news_route'))
app.use('/api/stats', require('./routes/stats_route'))
app.use('/api/references', require('./routes/reference_route'))
app.use('/api/tests', require('./routes/test_route'))

app.listen(port, () => {
    console.log(`proxy server runs on ${port}`)
})
