import Telegraf, { CustomContextMessage } from 'telegraf'
import moment from 'moment'
import db from '../../../db'
import api from '../../../api'
import remindersMessages from '../../messages/reminders'

export async function sendReminderCard(bot: Telegraf<CustomContextMessage>) {
    const allowedTime = [9, 12, 15, 18, 19, 21]
    const currentHours = moment().get('h')

    if (!allowedTime.includes(currentHours)) return

    const todayReminders = await db.getTodayReminders()

    for (let i = 0; i < todayReminders.length; i++) {
        const reminder = todayReminders[i]
        const event = await api.get(reminder.eventID)

        const messageText = remindersMessages.getReminderCard(reminder, event)

        const obj: any = { parse_mode: 'HTML' }

        await bot.telegram.sendMessage(reminder.userID, messageText, {
            ...obj, // need this hack because of Telegraf's weak typing =(
        })

        db.deleteReminder(reminder.id)
    }
}
