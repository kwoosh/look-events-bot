import api from '../../../common/api'
import db from '../../../common/db'
import { replies } from '../../../common/strings'

export async function sendList(ctx) {
    if (!ctx.from) return

    const reminders = await db.reminders.getList(ctx.from.id)

    let message = replies.yourReminders

    for (let i = 0; i < reminders.length; i++) {
        const reminder = reminders[i]
        await api
            .get(reminder.eventID)
            .then(event => {
                message += replies.singleLine(event.title, reminder.id, reminder.date)
            })
            .catch(console.error)
    }

    if (!reminders.length) message = replies.remindersEmpty

    ctx.replyWithHTML(message + replies.deleteReminder)
}
