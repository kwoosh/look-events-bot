import Extra from 'telegraf/extra'
import Markup from 'telegraf/markup'
import { buttons, cbQueryTypes } from './strings'

export function makeCallbackButton(queryType) {
    return (page, to) => {
        const text = buttons.toPage[to](page)
        const data = `${cbQueryTypes[queryType]}|${page}`

        return Markup.callbackButton(text, data)
    }
}

export function getPaginationKeyboard(currentPage, maxPages, queryType) {
    const paginationButton = makeCallbackButton(queryType)

    const PAGES = {
        current: Number(currentPage),
        next: Number(currentPage) + 1,
        prev: Number(currentPage) - 1,
        total: Number(maxPages),
        last: Number(maxPages),
        preLast: Number(maxPages) - 1,
        first: 1,
        preFirst: 2,
    }

    return Extra.HTML().markup(m => {
        const keyboard = []

        if (PAGES.current > PAGES.first) {
            keyboard.push(paginationButton(PAGES.first, 'first'))
        }

        if (PAGES.current > PAGES.preFirst) {
            keyboard.push(paginationButton(PAGES.prev, 'prev'))
        }

        keyboard.push(paginationButton(PAGES.current, 'current'))

        if (PAGES.current < PAGES.preLast) {
            keyboard.push(paginationButton(PAGES.next, 'next'))
        }

        if (PAGES.current < PAGES.last) {
            keyboard.push(paginationButton(PAGES.last, 'last'))
        }

        return m.inlineKeyboard(keyboard)
    })
}
