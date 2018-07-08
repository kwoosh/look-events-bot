import { ContextMessageUpdate } from 'telegraf'
import api from '../../../api'
import db from '../../../db'
import { BUTTON_TYPES, makeCallbackButton } from '../../buttons'
import remindersMessages from '../../messages/reminders'

export async function sendReminderCard(reminderID: number, ctx: ContextMessageUpdate) {
    const reminder = await db.getReminder(ctx.from.id, reminderID).catch(err => {
        console.error(err)
    })

    if (!reminder) return ctx.replyWithHTML(remindersMessages.reminderNonExist)

    const event = await api.get(reminder.eventID)
    const deleteButton = makeCallbackButton('Удалить', BUTTON_TYPES['reminder-delete'], { reminderID: reminder.id })
    const message = remindersMessages.getReminderCard(reminder, event)

    ctx.replyWithHTML(message, {
        reply_markup: { inline_keyboard: [[deleteButton]] },
        reply_to_message_id: reminder.messageID,
    })
}
