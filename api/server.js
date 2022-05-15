const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use('/api/news', require('./routes/news_route'))

app.listen(port, () => {
    console.log(`proxy server runs on ${port}`)
})
