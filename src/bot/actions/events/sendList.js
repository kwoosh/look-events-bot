// import { CustomContextMessage, Extra } from 'telegraf'
import Extra from 'telegraf/extra'
import api from '../../../api'
import { buttons, cbQueryTypes, replies } from '../../strings'

export const EVENTS_LIMMIT = 10

// export default async function(offset: number = 0, ctx: CustomContextMessage) {
export default async function(offset = 0, ctx) {
    const events = await api.getList({ limit: EVENTS_LIMMIT, offset })
    // console.log(events)

    if (!events.length) return

    ctx.replyWithHTML(
        `${events.map((event, i) => `${i + 1}. <b>${event.title}</b>\n`).join('')}`,
        Extra.markup((m) /* (m: any) */ => {
            const keyboard = []

            keyboard.push(m.callbackButton('<', `${cbQueryTypes['events-change-page']}|${offset}:${0}:prev`))
            keyboard.push(m.callbackButton('>', `${cbQueryTypes['events-change-page']}|${offset}:${0}:next`))

            return m.inlineKeyboard(keyboard)
        })
    )
}
