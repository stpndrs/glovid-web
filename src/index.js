import { setDarkModeOn } from './dark_mode'

import { refreshNewsCarousel } from './news_carousel'
import { refreshBeritaTerkini } from './berita_terkini'
import {
    refreshSebaranGlobal,
    refreshSebaranIndonesia,
    refreshSebaranPageIndonesia,
    refreshVaksinasi,
} from './sebaran'
import { refreshNewsPage } from './news_page'
import { initMap } from './maps'

// Dark Mode
if (localStorage.getItem('theme') == 'dark') setDarkModeOn()
export const setDarkMode = setDarkModeOn

export const homepageScript = () => {
    refreshNewsCarousel()

    refreshBeritaTerkini()

    refreshSebaranGlobal()
    refreshSebaranIndonesia()
}

export const beritaScript = () => {
    refreshNewsPage()
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
}
