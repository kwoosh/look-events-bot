import { ContextMessageUpdate } from 'telegraf'
import api from '../../../api'
import db from '../../../db'
import { remindersMessages } from '../../messages'

export default async function(ctx: ContextMessageUpdate) {
    const reminders = await db.getReminders(ctx.from.id)

    let message = remindersMessages.static.yourReminders

    for (let i = 0; i < reminders.length; i++) {
        const reminder = reminders[i]
        const event = await api.get(reminder.eventID)

        message += remindersMessages.singleLine(event.title, reminder.date, reminder.id)
    }

    ctx.replyWithHTML(message + remindersMessages.static.deleteReminder)
}
