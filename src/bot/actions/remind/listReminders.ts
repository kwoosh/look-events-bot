import { CustomContextMessage } from 'telegraf'
import api from '../../../api'
import db from '../../../db'
import remindersMessages from '../../messages/reminders'

export default async function(ctx: CustomContextMessage) {
    if (!ctx.from) return

    const reminders = await db.getReminders(ctx.from.id)

    let message = remindersMessages.yourReminders

    for (let i = 0; i < reminders.length; i++) {
        const reminder = reminders[i]
        const event = await api.get(reminder.eventID)

        message += remindersMessages.singleLine(event.title, reminder.date, reminder.id)
    }

    if (!reminders.length) message = remindersMessages.remindersEmpty

    ctx.replyWithHTML(message + remindersMessages.deleteReminder)
}
