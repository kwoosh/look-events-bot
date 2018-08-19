import db from '../../db'
import { commandReplies } from '../strings'

export default function(bot) {
    bot.start(ctx => {
        if (!ctx.from) return
        db.users.create(ctx.from.id, ctx.from.username || '')
        ctx.replyWithHTML(commandReplies['start'])
    })
}
