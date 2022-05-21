const axios = require('axios')

module.exports = {
    covidGoID: async (req, res) => {
        // https://data.covid19.go.id/public/api/pemeriksaan-vaksinasi.json
        try {
            const response = await axios.get(
                'https://data.covid19.go.id/public/api/pemeriksaan-vaksinasi.json'
            )
            return res.json(response.data.vaksinasi)
        } catch (error) {
            console.log(error)
            if (error.code != 'ECONNRESET') return res.send(error.response.data)

            return res.send('server error')
        }
    },
}
