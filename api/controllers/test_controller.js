const axios = require('axios')

module.exports = {
    firstTest: async (req, res) => {
        try {
            response = await axios.get(
                'https://covid19.go.id/feed/melakukan-perjalanan'
            )
            return res.send(response.data)
        } catch (error) {
            console.log(error.response)
            response = error.response
            return res.json({
                headers: error.response.headers,
                status: error.response.status,
                statusText: error.response.statusText,
            })
        }
    },
}
