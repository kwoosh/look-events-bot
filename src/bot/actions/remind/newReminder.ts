import moment from 'moment'
import { CustomContextMessage } from 'telegraf'
import api from '../../../api'
import db, { Reminder } from '../../../db'
import { format, getRemindDate, isSameDate } from '../../dates'
import remindersMessages from '../../messages/reminders'

export function isReminderExist(remindDate: moment.Moment, reminders: Reminder[]) {
    return reminders.reduce((prev, existed) => {
        return isSameDate(moment(existed.date), remindDate) ? true : prev
    }, false)
}

export default async function(eventID: number, daysBefore: number, messageID: number, ctx: CustomContextMessage) {
    if (!ctx.from) return

    const event = await api.get(eventID)
    const fromID = ctx.from.id

    const userReminders = await db.getReminders(fromID, event.id)
    const remindDate = getRemindDate(event.time.dates[0], daysBefore)

    const createReminder = async () => {
        await db.addReminder(fromID, event.id, messageID, format(remindDate))

        const message = remindersMessages.reminderCreated(event.title, remindDate.format(''))
        ctx.replyWithHTML(message, { reply_to_message_id: messageID })
    }

    if (userReminders.length && userReminders) {
        const reminderExist = isReminderExist(remindDate, userReminders)

        if (reminderExist) {
            const reminder = userReminders.find(r => isSameDate(moment(r.date), remindDate))
            if (reminder) ctx.replyWithHTML(remindersMessages.reminderExist(event.title, reminder.id))
        } else createReminder()
    } else {
        createReminder()
    }
}
