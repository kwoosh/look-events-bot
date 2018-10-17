import db from '../../db'
import { replies } from '../strings'

export default async function(ctx, payload) {
    const [reminderID] = payload

    await db.reminders.delete(Number(reminderID))
    ctx.replyWithHTML(replies.reminderDeleted)

    ctx.deleteMessage()
}
