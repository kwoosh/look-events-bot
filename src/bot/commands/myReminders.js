import api from '../../api'
import db from '../../db'
import { replies } from '../strings'

export default async function(ctx) {
    if (!ctx.from) return

    const reminders = await db.reminders.getList(ctx.from.id)

    let message = replies.yourReminders

    for (let i = 0; i < reminders.length; i++) {
        const reminder = reminders[i]
        const event = await api.get(reminder.eventID)

        message += replies.singleLine(event.title, reminder.id, reminder.date)
    }

    if (!reminders.length) message = replies.remindersEmpty

    ctx.replyWithHTML(message + replies.deleteReminder)
}
