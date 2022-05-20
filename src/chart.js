import { Chart, registerables } from 'chart.js'
import { statsByHarian, statsByProvinsi } from './fetch/statistics'
import moment from 'moment'
Chart.register(...registerables)

// positifday negatifday deathday mixeddata
export const initChart = (callback = false) => {
    // Positive day
    const pos = document.getElementById('positifday').getContext('2d')
    var posGradient = pos.createLinearGradient(0, 0, 0, 400)
    posGradient.addColorStop(0, 'rgba(255, 0, 0, 0.7)')
    posGradient.addColorStop(0.6, 'rgba(255, 0, 0, 0.5)')
    posGradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

    const options = {
        scales: {
            y: {
                grid: {
                    display: false,
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 5000,
                    font: {
                        size: 15,
                    },
                    padding: 12,
                },
            },
            x: {
                grid: {
                    borderDash: [5, 10],
                    color: '#b1b1b1',
                },
                ticks: {
                    font: {
                        size: 15,
                    },
                    padding: 16,
                },
            },
        },
        interaction: {
            mode: 'nearest',
            intersect: false,
            axis: 'xy',
        },
        plugins: {
            tooltip: {
                backgroundColor: '#090B1F',
                padding: 16,
                cornerRadius: 10,
                bodyFont: {
                    size: 16,
                },
                callbacks: {
                    title: (tooltipItem) => {},
                    labelPointStyle: (tooltipItem) => ({
                        pointStyle: 'circle',
                    }),
                    labelColor: (tooltipItem) => ({
                        borderRadius: 6,
                        backgroundColor: tooltipItem.dataset.borderColor,
                        borderColor: tooltipItem.dataset.borderColor,
                        borderWidth: 3,
                    }),
                    label: (tooltipItem) => {
                        return `  ${tooltipItem.dataset.label} : ${
                            tooltipItem.dataset.data[tooltipItem.dataIndex]
                        }`
                    },
                },
            },
            legend: {
                display: false,
            },
        },
    }

    const positifday = new Chart(pos, {
        type: 'line',
        data: {
            labels: [''],
            datasets: [
                {
                    label: 'Jumlah kasus',
                    data: [],
                    backgroundColor: posGradient,
                    borderColor: ['rgba(255, 0, 0, 1)'],
                    pointBackgroundColor: ['rgba(255, 0, 0, 1)'],
                    pointStyle: 'circle',
                    pointRadius: 1,
                    tension: 0.8,
                    borderWidth: 3,
                    fill: true,
                },
            ],
        },
        options,
    })

    // Negative day
    const neg = document.getElementById('negatifday').getContext('2d')
    var negGradient = pos.createLinearGradient(0, 0, 0, 400)
    negGradient.addColorStop(0, 'rgba(0, 0, 255, 0.7)')
    negGradient.addColorStop(0.6, 'rgba(0, 0, 255, 0.5)')
    negGradient.addColorStop(1, 'rgba(0, 0, 255, 0)')
    const negatifday = new Chart(neg, {
        type: 'line',
        data: {
            labels: [''],
            datasets: [
                {
                    label: 'Jumlah kasus',
                    data: [],
                    backgroundColor: negGradient,
                    borderColor: ['rgba(0, 0, 255, 1)'],
                    pointBackgroundColor: ['rgba(0, 0, 255, 1)'],
                    pointStyle: 'circle',
                    pointRadius: 1,
                    tension: 0.8,
                    borderWidth: 3,
                    fill: true,
                },
            ],
        },
        options,
    })

    // deathday
    const deathStatsCtx = document.getElementById('deathday').getContext('2d')
    var deathStatsGrad = deathStatsCtx.createLinearGradient(0, 0, 0, 400)
    deathStatsGrad.addColorStop(0, 'rgba(128,128,128, 0.7)')
    deathStatsGrad.addColorStop(0.6, 'rgba(128,128,128, 0.5)')
    deathStatsGrad.addColorStop(1, 'rgba(128,128,128, 0)')
    const deathday = new Chart(deathStatsCtx, {
        type: 'line',
        data: {
            labels: [''],
            datasets: [
                {
                    label: 'Jumlah kasus',
                    data: [],
                    backgroundColor: deathStatsGrad,
                    borderColor: ['rgba(128, 128, 128, 1)'],
                    pointBackgroundColor: ['rgba(128, 128, 128, 1)'],
                    pointStyle: 'circle',
                    pointRadius: 1,
                    tension: 0.8,
                    borderWidth: 3,
                    fill: true,
                },
            ],
        },
        options,
    })

    // mixed
    const mix = document.getElementById('mixeddata').getContext('2d')
    const mixeddata = new Chart(mix, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Jumlah kasus',
                    data: [],
                    backgroundColor: [posGradient],
                    borderColor: ['rgba(255, 0, 0, 1)'],
                    borderWidth: 1,
                    pointBackgroundColor: ['rgba(255, 0, 0, 1)'],
                    pointStyle: 'circle',
                    pointRadius: 1,
                    tension: 0.8,
                    borderWidth: 3,
                    fill: true,
                },
                {
                    label: 'Jumlah kasus',
                    data: [],
                    backgroundColor: [negGradient],
                    borderColor: ['rgba(0, 0, 255, 1)'],
                    borderWidth: 1,
                    pointBackgroundColor: ['rgba(0, 0, 255, 1)'],
                    pointStyle: 'circle',
                    pointRadius: 1,
                    tension: 0.8,
                    borderWidth: 3,
                    fill: true,
                },
                {
                    label: 'Jumlah kasus',
                    data: [],
                    backgroundColor: [deathStatsGrad],
                    borderColor: ['rgba(128, 128, 128, 1)'],
                    borderWidth: 1,
                    pointBackgroundColor: ['rgba(128, 128, 128, 1)'],
                    pointStyle: 'circle',
                    pointRadius: 1,
                    tension: 0.8,
                    borderWidth: 3,
                    fill: true,
                },
            ],
        },
        options,
    })

    // per province
    const prov = document.querySelector('.provdata').getContext('2d')
    const provdata = new Chart(prov, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: 'Jumlah Kasus',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: ['rgba(253, 104, 104, 0.8)'],
                    borderColor: ['rgb(253, 104, 104)'],
                    borderWidth: 1,
                },
                {
                    label: 'Jumlah kasus Sembuh',
                    data: [5, 3, 3, 5, 2, 3],
                    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                },
                {
                    label: 'Jumlah Kasus Meninggal',
                    data: [2, 2, 3, 4, 2, 3],
                    backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                    borderColor: ['rgba(255, 206, 86, 1)'],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        stepSize: 5000,
                        font: {
                            size: 10,
                        },
                        padding: 12,
                    },
                },
                x: {
                    grid: {
                        borderDash: [5, 10],
                        color: '#b1b1b1',
                    },
                    ticks: {
                        font: {
                            size: 10,
                        },
                        padding: 16,
                    },
                },
            },
            interaction: {
                mode: 'point',
                intersect: false,
                axis: 'xy',
            },
            plugins: {
                tooltip: {
                    backgroundColor: '#090B1F',
                    padding: 16,
                    cornerRadius: 10,
                    bodyFont: {
                        size: 16,
                    },
                    callbacks: {
                        title: (tooltipItem) => {},
                        labelPointStyle: (tooltipItem) => ({
                            pointStyle: 'circle',
                        }),
                        labelColor: (tooltipItem) => ({
                            borderRadius: 6,
                            backgroundColor: tooltipItem.dataset.borderColor,
                            borderColor: tooltipItem.dataset.borderColor,
                            borderWidth: 3,
                        }),
                        label: (tooltipItem) => {
                            return `  ${tooltipItem.dataset.label} : ${
                                tooltipItem.dataset.data[tooltipItem.dataIndex]
                            }`
                        },
                    },
                },
                legend: {
                    display: false,
                },
            },
        },
    })

    if (callback)
        callback(positifday, negatifday, deathday, mixeddata, provdata)
}

export const refreshDailyStats = async (
    positifday,
    negatifday,
    deathday,
    mixeddata
) => {
    try {
        const data = await statsByHarian()

        let labels = []
        let datasetPositif = []
        let datasetSembuh = []
        let datasetMeninggal = []
        data.update.harian.forEach((item, value) => {
            labels.push(moment(item.key).format('DD/MM/YYYY'))
            datasetPositif.push(item.jumlah_positif.value)
            datasetSembuh.push(item.jumlah_sembuh.value)
            datasetMeninggal.push(item.jumlah_meninggal.value)
        })
        positifday.data.labels = labels
        positifday.data.datasets[0].data = datasetPositif
        positifday.update()

        negatifday.data.datasets[0].data = datasetSembuh
        negatifday.data.labels = labels
        negatifday.update()

        deathday.data.datasets[0].data = datasetMeninggal
        deathday.data.labels = labels
        deathday.options.scales.y.ticks.stepSize = 500
        deathday.update()

        mixeddata.data.labels = labels
        mixeddata.data.datasets[0].data = datasetPositif
        mixeddata.data.datasets[1].data = datasetSembuh
        mixeddata.data.datasets[2].data = datasetMeninggal
        mixeddata.update()
    } catch (error) {
        console.error(error)
    }
}

export const refreshProvinceStats = async (provdata) => {
    try {
        const data = await statsByProvinsi()
        let labels = []
        let datasetKasus = []
        let datasetSembuh = []
        let datasetMeninggal = []

        data.list_data.forEach((item, index) => {
            labels.push(item.key)
            datasetKasus.push(item.jumlah_kasus)
            datasetSembuh.push(item.jumlah_sembuh)
            datasetMeninggal.push(item.jumlah_meninggal)
        })
        provdata.data.labels = labels
        provdata.data.datasets[0].data = datasetKasus
        provdata.data.datasets[1].data = datasetSembuh
        provdata.data.datasets[2].data = datasetMeninggal
        provdata.update()
    } catch (error) {
        console.error(error)
    }
}
