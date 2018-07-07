import { ContextMessageUpdate } from 'telegraf'
import api from '../../api'
import { BUTTON_TYPES, makeCallbackButton } from '../buttons'
import { getEventCard, replies } from '../messages'
import { AxiosError } from 'axios'

export async function sendCard(eventID: number, ctx: ContextMessageUpdate) {
    const event = await api.get(eventID).catch((err: AxiosError) => {
        if (err.response.status === 404) ctx.replyWithHTML(replies.eventNotFound)
    })

    if (!event) return

    const remindButton = makeCallbackButton('Напомнить', BUTTON_TYPES['reminder-ask'], { eventID: event.id })
    const message = getEventCard(event)

    ctx.replyWithHTML(message, {
        reply_markup: { inline_keyboard: [[remindButton]] },
    })
}
