import Extra from 'telegraf/extra'
import Markup from 'telegraf/markup'
import api from '../../../api'
import { cbQueryTypes } from '../../strings'

export const EVENTS_LIMMIT = 10

const toFirstPage = n => `« ${n}`
const toLastPage = n => `${n} »`
const currentPage = n => `· ${n} ·`
const toNextPage = n => `${n} ›`
const toPeviousPage = n => `‹ ${n}`

const paginaionButton = (text, ...payload) => {
    const type = cbQueryTypes['events-change-page']
    return Markup.callbackButton(text, `${type}|${payload.join(':')}`)
}

export default async function(page, ctx) {
    const { markup, messageText } = await generateListWithPagination(page)

    ctx.replyWithHTML(messageText, markup)
}

export async function generateListWithPagination(page) {
    const offset = Number(page) * EVENTS_LIMMIT - EVENTS_LIMMIT
    const events = await api.getList({ limit: EVENTS_LIMMIT, offset })
    const eventsCount = await api.getCount().then(({ count }) => count)

    const pages = {
        current: Number(page),
        next: Number(page) + 1,
        prev: Number(page) - 1,
        total: Math.ceil(eventsCount / EVENTS_LIMMIT),
    }

    const messageText =
        `Page ${pages.current}\n\n` +
        events.map(event => `(/e${event.id}) <b>${event.title}</b>\n`).join('')

    return {
        messageText,
        markup: Extra.HTML().markup(m => {
            const keyboard = []

            if (pages.current > 1) {
                keyboard.push(paginaionButton(toFirstPage(1), 1))
            }
            if (pages.current > 2) {
                keyboard.push(paginaionButton(toPeviousPage(pages.prev), pages.prev))
            }
            keyboard.push(paginaionButton(currentPage(pages.current), pages.current))
            if (pages.current < pages.total - 1) {
                keyboard.push(paginaionButton(toNextPage(pages.next), pages.next))
            }
            if (pages.current < pages.total) {
                keyboard.push(paginaionButton(toLastPage(pages.total), pages.total))
            }

            return m.inlineKeyboard(keyboard)
        }),
    }
}
