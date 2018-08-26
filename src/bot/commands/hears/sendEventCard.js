import Extra from 'telegraf/extra'
import api from '../../../api'
import { buttons, cbQueryTypes, replies } from '../../strings'

async function sendCard(eventID, ctx) {
    const event = await api.get(eventID).catch(err => {
        if (err.response && err.response.status === 404) ctx.replyWithHTML(replies.eventNotFound)
    })

    if (!event) return

    ctx.replyWithHTML(
        replies.getEventCard(event),
        Extra.markup(m => {
            const remindButton = m.callbackButton(buttons.remind, `${cbQueryTypes['reminder-ask']}|${event.id}`)
            return m.inlineKeyboard([remindButton])
        })
    )
}

export default function(ctx) {
    if (!ctx.match) return
    sendCard(Number(ctx.match[1]), ctx)
}
