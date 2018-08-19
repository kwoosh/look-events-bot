import Markup from 'telegraf/markup'
import api from '../../../api'
import db from '../../../db'
import { buttons, cbQueryTypes, replies } from '../../strings'

export default async function(reminderID, ctx) {
    if (!ctx.from) return

    const reminder = await db.reminders.get(ctx.from.id, reminderID).catch(console.error)

    if (!reminder) return ctx.replyWithHTML(replies.reminderNonExist)

    const event = await api.get(reminder.eventID)
    const deleteButton = Markup.callbackButton(buttons.delete, `${cbQueryTypes['reminder-delete']}|${reminder.id}`)
    const message = replies.getReminderInfo(reminder, event)

    ctx.replyWithHTML(message, Markup.inlineKeyboard([deleteButton]).extra())
}
