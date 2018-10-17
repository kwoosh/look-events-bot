import Markup from 'telegraf/markup'
import api from '../../../common/api'
import db from '../../../common/db'
import { buttons, cbQueryTypes, replies } from '../../../common/strings'

export async function sendInfo(reminderID, ctx) {
    if (!ctx.from) return

    const reminder = await db.reminders.get(ctx.from.id, reminderID).catch(console.error)

    if (!reminder) return ctx.replyWithHTML(replies.reminderNonExist)

    const event = await api.get(reminder.eventID).catch(err => console.error(err))
    const deleteButton = Markup.callbackButton(buttons.delete, `${cbQueryTypes['reminder-delete']}|${reminder.id}`)
    const message = replies.getReminderInfo(reminder, event)

    ctx.replyWithHTML(message, Markup.inlineKeyboard([deleteButton]).extra())
}
