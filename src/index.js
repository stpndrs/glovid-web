import { setDarkModeOn } from './dark_mode'

import { refreshNewsCarousel } from './news_carousel'
import { refreshBeritaTerkini } from './berita_terkini'
import { refreshSebaranGlobal, refreshSebaranIndonesia } from './sebaran'

// Dark Mode
if (localStorage.getItem('theme') == 'dark') setDarkModeOn()
export const setDarkMode = setDarkModeOn

export const homepageScript = () => {
    refreshNewsCarousel()

    refreshBeritaTerkini()

    refreshSebaranGlobal()
    refreshSebaranIndonesia()
}
