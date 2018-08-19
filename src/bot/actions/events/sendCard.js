import Extra from 'telegraf/extra'
import api from '../../../api'
import { buttons, cbQueryTypes, replies } from '../../strings'

export default async function(eventID, ctx) {
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
