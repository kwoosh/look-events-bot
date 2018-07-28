import { CustomContextMessage, Markup } from 'telegraf'
import api from '../../../api'
import db from '../../../db'
import { buttons, cbQueryTypes, replies } from '../../strings'

const markup: any = Markup

export default async function(reminderID: number, ctx: CustomContextMessage) {
    if (!ctx.from) return

    const reminder = await db.reminders.get(ctx.from.id, reminderID).catch(console.error)

    if (!reminder) return ctx.replyWithHTML(replies.reminderNonExist)

    const event = await api.get(reminder.eventID)
    const deleteButton = markup.callbackButton(buttons.delete, `${cbQueryTypes['reminder-delete']}|${reminder.id}`)
    const message = replies.getReminderInfo(reminder, event)

    ctx.replyWithHTML(message, markup.inlineKeyboard([deleteButton]))
}
