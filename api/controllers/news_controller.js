const Parser = require('rss-parser')
const parser = new Parser()

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
}
