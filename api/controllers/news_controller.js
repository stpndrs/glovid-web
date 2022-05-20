const axios = require('axios')
const Parser = require('rss-parser')
const parser = new Parser({
    headers: {
        'User-Agent': 'application',
    },
})
let covid19News = []

module.exports = {
    findAllCovid19: async (req, res) => {
        try {
            let page = parseInt(req.query.page)
            let limit = parseInt(req.query.limit)
            let offset = parseInt(req.query.offset)
            if (!page) page = 1
            if (!limit) limit = 50
            if (!offset) offset = limit * (page - 1)

            if (covid19News.length <= 0) {
                const data = await parser.parseURL(
                    'https://www.voaindonesia.com/api/zt-yqreivvqr'
                )
                covid19News = data.items
                setTimeout(() => {
                    covid19News = []
                }, 1000 * 60 * 30)
            }

            let totalPages = parseInt(covid19News.length / limit)
            if (covid19News.length % limit > 0) totalPages++

            let covid19NewsOps = covid19News.slice()
            return res.json({
                status: 'OK',
                code: 200,
                data: covid19NewsOps.splice(offset, limit),
                pagination: {
                    page,
                    limit,
                    offset,
                    total_pages: totalPages,
                    total_count: covid19News.length,
                },
            })
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },
    // findAllCovid19: async (req, res) => {
    //     try {
    //         response = await axios.get(
    //             'https://covid19.go.id/feed/hoax-buster',
    //             {
    //                 headers: {
    //                     'User-Agent': 'application',
    //                 },
    //             }
    //         )
    //         return res.send('mantapppp')
    //     } catch (error) {
    //         console.log(error)
    //         return res.send(error.response.data)
    //     }
    // },
}
