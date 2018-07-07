import * as moment from 'moment'
import { ContextMessageUpdate } from 'telegraf'
import api from '../../../api'
import db, { Reminder } from '../../../db'
import { format, getRemindDate } from '../../dates'
import { remindersMessages } from '../../messages'

export function isExist(remindDate: string, reminders: Reminder[]) {
    return reminders.reduce((prev, curr) => {
        return format(moment(curr.date)) === remindDate ? true : prev
    }, false)
}

export default async function(eventID: number, daysBefore: number, messageID: number, ctx: ContextMessageUpdate) {
    const event = await api.get(eventID)

    const userReminders = await db.getReminders(ctx.from.id, event.id)
    const remindDate = format(getRemindDate(event.time.dates[0], daysBefore))

    const createReminder = async () => {
        await db.addReminder(ctx.from.id, event.id, messageID, remindDate)

        const message = remindersMessages.reminderCreated(event.title, remindDate)
        ctx.replyWithHTML(message)
    }

    if (userReminders.length) {
        const reminderExist = isExist(remindDate, userReminders)

        if (reminderExist) ctx.replyWithHTML(remindersMessages.reminderExist(event.title, remindDate))
        else createReminder()
    } else {
        createReminder()
    }
}
