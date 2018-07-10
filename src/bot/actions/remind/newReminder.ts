import moment from 'moment'
import { CustomContextMessage } from 'telegraf'
import api from '../../../api'
import db, { Reminder } from '../../../db'
import { format, getRemindDate } from '../../dates'
import remindersMessages from '../../messages/reminders'

export function isExist(remindDate: string, reminders: Reminder[]) {
    return reminders.reduce((prev, curr) => {
        return format(moment(curr.date)) === remindDate ? true : prev
    }, false)
}

export default async function(eventID: number, daysBefore: number, messageID: number, ctx: CustomContextMessage) {
    if (!ctx.from) return

    const event = await api.get(eventID)
    const fromID = ctx.from.id
    const userReminders = await db.getReminders(fromID, event.id)
    const remindDate = format(getRemindDate(event.time.dates[0], daysBefore))

    const createReminder = async () => {
        await db.addReminder(fromID, event.id, messageID, remindDate)

        const message = remindersMessages.reminderCreated(event.title, remindDate)
        ctx.replyWithHTML(message, { reply_to_message_id: messageID })
    }

    if (userReminders.length && userReminders) {
        const reminderExist = isExist(remindDate, userReminders)

        if (reminderExist) {
            const reminder = userReminders.find(r => format(moment(r.date)) === remindDate)
            if (reminder) ctx.replyWithHTML(remindersMessages.reminderExist(event.title, remindDate, reminder.id))
        } else createReminder()
    } else {
        createReminder()
    }
}
