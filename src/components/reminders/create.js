import moment from 'moment'
import api from '../../common/api'
import db from '../../common/db'
import { format, getRemindDate, isSameDate } from '../../common/utils/dates'
import { replies } from '../../common/strings'

export function isReminderExist(remindDate, reminders) {
    return reminders.reduce((prev, existed) => {
        return isSameDate(moment(existed.date), remindDate) ? true : prev
    }, false)
}

export async function createReminder(ctx, payload) {
    if (!ctx.from) return

    const [eventID, daysBefore, messageID] = payload

    const event = await api.get(eventID)
    const fromID = ctx.from.id

    const userReminders = await db.reminders.getList(fromID, event.id)
    const remindDate = getRemindDate(event.time.dates[0], Number(daysBefore))

    const createReminder = async () => {
        await db.reminders.create(fromID, event.id, Number(messageID), format(remindDate))

        ctx.replyWithHTML(replies.reminderCreated(event.title, remindDate.format('')), {
            reply_to_message_id: Number(messageID),
        })
    }

    if (userReminders.length && userReminders) {
        const reminderExist = isReminderExist(remindDate, userReminders)

        if (reminderExist) {
            const reminder = userReminders.find(r => isSameDate(moment(r.date), remindDate))
            if (reminder) ctx.replyWithHTML(replies.reminderExist(event.title, reminder.id))
        } else createReminder()
    } else {
        createReminder()
    }
}
