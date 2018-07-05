import { ContextMessageUpdate } from 'telegraf'
import { api } from '../../api'
import { BUTTON_TYPES, makeCallbackButton } from '../buttons'
import { getEventCard } from '../messages'

export async function sendCard(eventID: number, ctx: ContextMessageUpdate) {
    const event = await api.get(eventID)

    const remindButton = makeCallbackButton('Напомнить', BUTTON_TYPES['reminder:event'], { eventID: event.id })
    const message = getEventCard(event)

    ctx.replyWithHTML(message, {
        reply_markup: { inline_keyboard: [[remindButton]] },
    })
}
