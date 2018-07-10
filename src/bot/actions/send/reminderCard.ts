import { CustomContextMessage } from 'telegraf'
import api from '../../../api'
import db from '../../../db'
import { BUTTONS, makeCallbackButton } from '../../buttons'
import remindersMessages from '../../messages/reminders'

export async function sendReminderCard(reminderID: number, ctx: CustomContextMessage) {
    if (!ctx.from) return

    const reminder = await db.getReminder(ctx.from.id, reminderID).catch(err => {
        console.error(err)
    })

    if (!reminder) return ctx.replyWithHTML(remindersMessages.reminderNonExist)

    const event = await api.get(reminder.eventID)
    const deleteButton = makeCallbackButton(BUTTONS.texts.delete, BUTTONS.types['reminder-delete'], { reminderID: reminder.id })
    const message = remindersMessages.getReminderCard(reminder, event)

    ctx.replyWithHTML(message, {
        reply_markup: { inline_keyboard: [[deleteButton]] },
        reply_to_message_id: reminder.messageID,
    })
}
