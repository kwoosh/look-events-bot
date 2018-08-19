import Extra from 'telegraf/extra'
import api from '../../../api'
import { cbQueryTypes } from '../../strings'

export const EVENTS_LIMMIT = 10

export default async function(offset = 0, ctx) {
    const events = await api.getList({ limit: EVENTS_LIMMIT, offset })

    if (!events.length) return

    const eventsListMessage = events.map((event, i) => `${i + 1}. <b>${event.title}</b>\n`).join('')

    ctx.replyWithHTML(
        eventsListMessage,
        Extra.markup(m => {
            const keyboard = []

            keyboard.push(m.callbackButton('<', `${cbQueryTypes['events-change-page']}|${offset}:${0}:prev`))
            keyboard.push(m.callbackButton('>', `${cbQueryTypes['events-change-page']}|${offset}:${0}:next`))

            return m.inlineKeyboard(keyboard)
        })
    )
}
