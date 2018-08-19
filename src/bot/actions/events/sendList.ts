import { CustomContextMessage, Extra } from 'telegraf'
import api from '../../../api'
import { buttons, cbQueryTypes, replies } from '../../strings'

const extra: any = Extra

export const EVENTS_LIMMIT = 10

export default async function(offset: number = 0, ctx: CustomContextMessage) {
    const events = await api.getList({ limit: EVENTS_LIMMIT, offset })
    // console.log(events)

    if (!events.length) return

    ctx.replyWithHTML(
        `${events.map((event, i) => `${i + 1}. <b>${event.title}</b>\n`).join('')}`,
        extra.markup((m: any) => {
            const keyboard = []

            keyboard.push(m.callbackButton('<', `${cbQueryTypes['events-change-page']}|${offset}:${0}:prev`))
            keyboard.push(m.callbackButton('>', `${cbQueryTypes['events-change-page']}|${offset}:${0}:next`))

            return m.inlineKeyboard(keyboard)
        })
    )
}
