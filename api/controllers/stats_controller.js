const axios = require('axios')

module.exports = {
    global: async (req, res) => {
        try {
            const response = await axios.get(
                'https://disease.sh/v3/covid-19/all'
            )
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },

    indonesia: async (req, res) => {
        try {
            const response = await axios.get(
                'https://disease.sh/v3/covid-19/countries/360'
            )
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },

    statsByProvince: async (req, res) => {
        try {
            const response = await axios.get(
                'https://data.covid19.go.id/public/api/prov.json'
            )
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },

    statsByDaily: async (req, res) => {
        try {
            const response = await axios.get(
                'https://data.covid19.go.id/public/api/update.json'
            )
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },
}
