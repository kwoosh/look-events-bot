import { AxiosError } from 'axios'
import { CustomContextMessage, Extra } from 'telegraf'
import api from '../../../api'
import { buttons, cbQueryTypes, replies } from '../../strings'

const extra: any = Extra

export default async function(eventID: number, ctx: CustomContextMessage) {
    const event = await api.get(eventID).catch((err: AxiosError) => {
        if (err.response) {
            if (err.response.status === 404) ctx.replyWithHTML(replies.eventNotFound)
        }
    })

    if (!event) return

    ctx.replyWithHTML(
        replies.getEventCard(event),
        extra.markup((m: any) => {
            const remindButton = m.callbackButton(buttons.remind, `${cbQueryTypes['reminder-ask']}|${event.id}`)
            return m.inlineKeyboard([remindButton])
        })
    )
}
