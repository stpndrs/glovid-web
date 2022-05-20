import moment from 'moment'
import { getBeritaTerkini } from './fetch/news'

export const refreshNewsCarousel = async () => {
    const newsCarousel = document.querySelector('.api-news')
    const response = await getBeritaTerkini(1, 5)

    let content = ``
    response.data.forEach((item, index) => {
        content += `
            <div class="swiper-slide">
                <img src="${item.enclosure.url}" alt="" />
                <div class="caption">
                    <h3>
                        <a target="_blank" href="${item.link}">
                            ${item.title}
                        </a>
                    </h3>
                    <div class='badges'>
                        <div class="badge badge-yellow">
                            <i class="bi bi-calendar-week"></i>
                            ${moment(item.pubDate).format('DD MMMM YYYY')}
                        </div>
                        ${item.categories
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
                        ${item.contentSnippet.substr(0, 200)} . . .
                    </p>
                </div>
            </div>
        `
    })
    newsCarousel.innerHTML = content
    swiper.update()
    swiper.init()
}
