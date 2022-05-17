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
}
