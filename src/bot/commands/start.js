import db from '../../db'
import { commands } from '../strings'

export default function(ctx) {
    if (!ctx.from) return

    db.users.create(ctx.from)

    ctx.replyWithHTML(`Привет! Используй клавиатуру ниже, чтобы вызывать команды. Если нужна помощь, то нажми /${commands.help}`)
}
