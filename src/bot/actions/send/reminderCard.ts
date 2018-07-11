import Telegraf, { CustomContextMessage } from 'telegraf'
import db from '../../../db'
import api from '../../../api'
import remindersMessages from '../../messages/reminders'

export async function sendReminderCard(bot: Telegraf<CustomContextMessage>) {
    const todayReminders = await db.getTodayReminders()

    for (let i = 0; i < todayReminders.length; i++) {
        const reminder = todayReminders[i]
        const event = await api.get(reminder.eventID)

        const messageText = remindersMessages.getReminderCard(reminder, event)

        const obj: any = { parse_mode: 'HTML' }

        const msg = await bot.telegram.sendMessage(reminder.userID, messageText, {
            // reply_to_message_id: reminder.messageID,
            ...obj, // need this hack because of Telegraf's weak typing =(
        })

        db.deleteReminder(reminder.id)
    }
}
