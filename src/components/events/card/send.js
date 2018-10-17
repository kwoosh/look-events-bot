import Extra from 'telegraf/extra'
import api from '../../../common/api'
import { cbQueryTypes, replies } from '../../../common/strings'

export async function sendCard(eventID, ctx) {
    const event = await api.get(eventID).catch(err => {
        if (err.response && err.response.status === 404) ctx.replyWithHTML(replies.eventNotFound)
    })

    if (!event) return

    ctx.replyWithHTML(
        replies.getEventCard(event),
        Extra.markup(m => {
            const remindButton = m.callbackButton('Напомнить', `${cbQueryTypes['reminder-ask']}|${event.id}`)
            return m.inlineKeyboard([remindButton])
        })
    )
}
