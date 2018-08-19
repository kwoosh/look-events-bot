import moment from 'moment'
// import Telegraf, { CustomContextMessage } from 'telegraf'
import api from '../../../api'
import db from '../../../db'
import { replies } from '../../strings'

// export default async function(bot: Telegraf<CustomContextMessage>) {
export default async function(bot /* : Telegraf<CustomContextMessage> */) {
    const allowedTime = [9, 12, 15, 18, 19, 21]
    const currentHours = moment().get('h')

    if (!allowedTime.includes(currentHours)) return

    const todayReminders = await db.reminders.getAllForToday()

    for (let i = 0; i < todayReminders.length; i++) {
        const reminder = todayReminders[i]
        const event = await api.get(reminder.eventID)

        const messageText = replies.getReminderCard(reminder, event)

        // const obj: any = { parse_mode: 'HTML' }

        // await bot.telegram.sendMessage(reminder.userID, messageText, {
        //     ...obj, // need this hack because of Telegraf's weak typing =(
        // })

        await bot.telegram.sendMessage(reminder.userID, messageText, { parse_mode: 'HTML' })

        db.reminders.delete(reminder.id)
    }
}
