import { ContextMessageUpdate } from 'telegraf'
import db from '../../../db'
import remindersMessages from '../../messages/reminders'

export default async function(reminderID: number, ctx: ContextMessageUpdate) {
    await db.deleteReminder(reminderID)
    ctx.replyWithHTML(remindersMessages.deleted)
    ctx.deleteMessage()
}
