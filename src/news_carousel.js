import axios from 'axios'
import moment from 'moment'
import { BASE_URL } from './constant'

export const getNewsCarousel = async () => {
    const response = await axios.get(`${BASE_URL}/api/news/covid19`, {})
    return response.data
}
export const refreshNewsCarousel = async () => {
    const newsCarousel = document.querySelector('.api-news')
    const response = await getNewsCarousel()
    const limit = 5
    if (response.data.items.length < 5) limit = data.length

    let content = ``
    for (let i = 0; i < limit; i++) {
        content += `
            <div class="swiper-slide">
                <img src="${response.data.items[i].enclosure.url}" alt="" />
                <div class="caption">
                    <h3>
                        <a target="_blank" href="${
                            response.data.items[i].link
                        }">
                            ${response.data.items[i].title}
                        </a>
                    </h3>
                    <div class='badges'>
                        <div class="badge badge-yellow">
                            <i class="bi bi-calendar-week"></i>
                            ${moment(response.data.items[i].pubDate).format(
                                'DD MMMM YYYY'
                            )}
                        </div>
                        ${response.data.items[i].categories
                            .map(
                                (item) =>
                                    `<div class="badge badge-red">
                                    <i class="bi bi-tag"></i>
                                    ${item}
                                </div>`
                            )
                            .join('')}
                    </div>
                    <p class='phone-none'>
                        ${response.data.items[i].contentSnippet.substr(
                            0,
                            200
                        )} . . .
                    </p>
                </div>
            </div>
        `
    }

    newsCarousel.innerHTML = content
    swiper.update()
    swiper.init()
}
