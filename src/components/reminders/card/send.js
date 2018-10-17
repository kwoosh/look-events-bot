import moment from 'moment'
import api from '../../../common/api'
import db from '../../../common/db'
import { replies } from '../../../common/strings'

export async function sendReminderCard(bot) {
    const allowedTime = [9, 12, 15, 18, 19, 21]
    const currentHours = moment().get('h')

    if (!allowedTime.includes(currentHours)) return

    const todayReminders = await db.reminders.getAllForToday()

    for (let i = 0; i < todayReminders.length; i++) {
        const reminder = todayReminders[i]
        const event = await api.get(reminder.eventID)

        const text = replies.getReminderCard(reminder, event)

        await bot.telegram.sendMessage(reminder.userID, text, {
            parse_mode: 'HTML',
        })
        // handle errors

        db.reminders.delete(reminder.id)
    }
}
