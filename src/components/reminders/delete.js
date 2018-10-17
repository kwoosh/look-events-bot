import db from '../../common/db'
import { replies } from '../../common/strings'

export async function deleteReminder(ctx, payload) {
    const [reminderID] = payload

    await db.reminders.delete(Number(reminderID))
    ctx.replyWithHTML(replies.reminderDeleted)

    ctx.deleteMessage()
}
