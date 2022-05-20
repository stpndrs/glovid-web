import { setDarkModeOn } from './dark_mode'

import { refreshNewsCarousel } from './news_carousel'
import { refreshBeritaTerkini } from './berita_terkini'
import {
    refreshSebaranGlobal,
    refreshSebaranIndonesia,
    refreshSebaranPageIndonesia,
    refreshVaksinasi,
} from './sebaran'
import { onMount as onNewsMount, refreshNewsPage } from './news_page'
import { initMap } from './maps'
import { initChart, refreshDailyStats, refreshProvinceStats } from './chart'
import { onMount as onRsRujukanMount, refreshRujukanRS } from './rs_rujukan'
import { onMount as onProvinsiMount, refreshProvinsi } from './provinsi'

let sebaranCharts = {}

// Dark Mode
let isDark = false
export const setDarkMode = () => {
    let emoticon = ''
    isDark = document.body.classList.toggle('dark')

    if (isDark) {
        emoticon = '<i class="bi bi-brightness-high"></i>'
        localStorage.setItem('theme', 'dark')
    } else {
        emoticon = '<i class="bi bi-moon"></i>'
        localStorage.removeItem('theme')
    }
    document.getElementById('darkBtn').innerHTML = emoticon

    if (Object.keys(sebaranCharts).length !== 0) {
        if (isDark) {
            sebaranCharts.positifday.options.scales.y.ticks.color = '#E8A421'
            sebaranCharts.positifday.options.scales.x.ticks.color = '#E8A421'
            sebaranCharts.negatifday.options.scales.y.ticks.color = '#E8A421'
            sebaranCharts.negatifday.options.scales.x.ticks.color = '#E8A421'
            sebaranCharts.deathday.options.scales.y.ticks.color = '#E8A421'
            sebaranCharts.deathday.options.scales.x.ticks.color = '#E8A421'
            sebaranCharts.mixeddata.options.scales.y.ticks.color = '#E8A421'
            sebaranCharts.mixeddata.options.scales.x.ticks.color = '#E8A421'
            sebaranCharts.provdata.options.scales.y.ticks.color = '#E8A421'
            sebaranCharts.provdata.options.scales.x.ticks.color = '#E8A421'
        } else {
            sebaranCharts.positifday.options.scales.y.ticks.color = '#E8A421'
            sebaranCharts.positifday.options.scales.x.ticks.color = '#E8A421'
            sebaranCharts.negatifday.options.scales.y.ticks.color = '#8D94A0'
            sebaranCharts.negatifday.options.scales.x.ticks.color = '#8D94A0'
            sebaranCharts.deathday.options.scales.y.ticks.color = '#8D94A0'
            sebaranCharts.deathday.options.scales.x.ticks.color = '#8D94A0'
            sebaranCharts.mixeddata.options.scales.y.ticks.color = '#8D94A0'
            sebaranCharts.mixeddata.options.scales.x.ticks.color = '#8D94A0'
            sebaranCharts.provdata.options.scales.y.ticks.color = '#8D94A0'
            sebaranCharts.provdata.options.scales.x.ticks.color = '#8D94A0'
        }
        sebaranCharts.positifday.update()
        sebaranCharts.negatifday.update()
        sebaranCharts.deathday.update()
        sebaranCharts.mixeddata.update()
    }
}
if (localStorage.getItem('theme') == 'dark') setDarkMode()

export const homepageScript = () => {
    refreshNewsCarousel()

    refreshBeritaTerkini()

    refreshSebaranGlobal()
    refreshSebaranIndonesia()
}

export const beritaScript = () => {
    onNewsMount()
}

export const sebaranScript = () => {
    refreshSebaranPageIndonesia()
    refreshVaksinasi()
    initMap()
    initChart((positifday, negatifday, deathday, mixeddata, provdata) => {
        if (isDark) {
            positifday.options.scales.y.ticks.color = '#E8A421'
            positifday.options.scales.x.ticks.color = '#E8A421'
            negatifday.options.scales.y.ticks.color = '#E8A421'
            negatifday.options.scales.x.ticks.color = '#E8A421'
            deathday.options.scales.y.ticks.color = '#E8A421'
            deathday.options.scales.x.ticks.color = '#E8A421'
            mixeddata.options.scales.y.ticks.color = '#E8A421'
            mixeddata.options.scales.x.ticks.color = '#E8A421'
            provdata.options.scales.y.ticks.color = '#E8A421'
            provdata.options.scales.x.ticks.color = '#E8A421'
        } else {
            positifday.options.scales.y.ticks.color = '#E8A421'
            positifday.options.scales.x.ticks.color = '#E8A421'
            negatifday.options.scales.y.ticks.color = '#8D94A0'
            negatifday.options.scales.x.ticks.color = '#8D94A0'
            deathday.options.scales.y.ticks.color = '#8D94A0'
            deathday.options.scales.x.ticks.color = '#8D94A0'
            mixeddata.options.scales.y.ticks.color = '#8D94A0'
            mixeddata.options.scales.x.ticks.color = '#8D94A0'
            provdata.options.scales.y.ticks.color = '#8D94A0'
            provdata.options.scales.x.ticks.color = '#8D94A0'
        }
        positifday.update()
        negatifday.update()
        deathday.update()
        mixeddata.update()
        refreshDailyStats(positifday, negatifday, deathday, mixeddata)
        refreshProvinceStats(provdata)
        sebaranCharts = {
            positifday,
            negatifday,
            deathday,
            mixeddata,
            provdata,
        }
    })
}

export const rsRujukanScript = () => {
    onRsRujukanMount()
    refreshRujukanRS()
}

export const provinceScript = () => {
    onProvinsiMount()
    refreshProvinsi()
}
