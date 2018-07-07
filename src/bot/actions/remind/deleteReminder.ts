import { ContextMessageUpdate } from 'telegraf'
import db from '../../../db'

export default async function(reminderID: number, ctx: ContextMessageUpdate) {
    await db.deleteReminder(reminderID)
    ctx.reply('deleted')
}
