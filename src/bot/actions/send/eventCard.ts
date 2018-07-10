import { AxiosError } from 'axios'
import { CustomContextMessage } from 'telegraf'
import api from '../../../api'
import { BUTTONS, makeCallbackButton } from '../../buttons'
import eventsMessages from '../../messages/events'

export async function sendEventCard(eventID: number, ctx: CustomContextMessage) {
    const event = await api.get(eventID).catch((err: AxiosError) => {
        if (err.response) {
            if (err.response.status === 404) ctx.replyWithHTML(eventsMessages.eventNotFound)
        }
    })

    if (!event) return

    const remindButton = makeCallbackButton(BUTTONS.texts.remind, BUTTONS.types['reminder-ask'], { eventID: event.id })
    const message = eventsMessages.getEventCard(event)

    ctx.replyWithHTML(message, {
        reply_markup: { inline_keyboard: [[remindButton]] },
    })
}
