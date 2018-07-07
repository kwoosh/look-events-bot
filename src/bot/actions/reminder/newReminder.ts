import * as moment from 'moment'
import { ContextMessageUpdate } from 'telegraf'
import api from '../../../api'
import { db, Reminder } from '../../../db'
import { getRemindDate } from '../../dates'
import { reminders } from '../../messages'

export function isExist(remindDate: string, userReminders: Reminder[]) {
    return userReminders.reduce((prev, curr) => {
        return moment(curr.date).format('YYYY-MM-DD') === remindDate ? true : prev
    }, false)
}

export default async function(eventID: number, daysBefore: number, messageID: number, ctx: ContextMessageUpdate) {
    const event = await api.get(eventID)

    const userReminders = await db.getReminders(ctx.from.id, event.id)
    const remindDate = getRemindDate(moment(event.time.dates[0]), daysBefore).format('YYYY-MM-DD')

    const createReminder = async () => {
        await db.addReminder(ctx.from.id, event.id, messageID, remindDate)

        const message = reminders.reminderCreated(event.title, remindDate)
        ctx.replyWithHTML(message)
    }

    if (userReminders.length) {
        const reminderExist = isExist(remindDate, userReminders)

        if (reminderExist) ctx.replyWithHTML(reminders.reminderExist(event.title, remindDate))
        else createReminder()
    } else {
        createReminder()
    }
}
