import { setDarkModeOn } from './dark_mode'

import { refreshNewsCarousel } from './news_carousel'
import { refreshBeritaTerkini } from './berita_terkini'
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
