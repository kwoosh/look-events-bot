import Telegraf, { CustomContextMessage } from 'telegraf'
import { commandNames, commandReplies } from '../strings'

export default function(bot: Telegraf<CustomContextMessage>) {
    bot.command(commandNames['help'], ctx => {
        ctx.replyWithHTML(commandReplies['help'])
    })
}
