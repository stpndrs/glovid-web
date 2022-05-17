const axios = require('axios')
const Parser = require('rss-parser')
const parser = new Parser({
    headers: {
        'User-Agent': 'application',
    },
})

module.exports = {
    findAllCovid19: async (req, res) => {
        try {
            feed = await parser.parseURL(
                'https://www.voaindonesia.com/api/zt-yqreivvqr'
            )
            return res.json({
                status: 'OK',
                code: 200,
                data: feed,
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
