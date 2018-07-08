import { AxiosError } from 'axios'
import { ContextMessageUpdate } from 'telegraf'
import api from '../../../api'
import { BUTTON_TYPES, makeCallbackButton } from '../../buttons'
import eventsMessages from '../../messages/events'

export async function sendEventCard(eventID: number, ctx: ContextMessageUpdate) {
    const event = await api.get(eventID).catch((err: AxiosError) => {
        if (err.response.status === 404) ctx.replyWithHTML(eventsMessages.eventNotFound)
    })

    if (!event) return

    const remindButton = makeCallbackButton('Напомнить', BUTTON_TYPES['reminder-ask'], { eventID: event.id })
    const message = eventsMessages.getEventCard(event)

    ctx.replyWithHTML(message, {
        reply_markup: { inline_keyboard: [[remindButton]] },
    })
}
