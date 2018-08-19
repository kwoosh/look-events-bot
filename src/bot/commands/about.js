import { commandNames, commandReplies } from '../strings'

export default function(bot) {
    bot.command(commandNames['about'], ctx => {
        ctx.replyWithHTML(commandReplies['about'])
    })
}
