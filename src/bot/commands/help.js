import { commandNames, commandReplies } from '../strings'

export default function(bot) {
    bot.command(commandNames['help'], ctx => {
        ctx.replyWithHTML(commandReplies['help'])
    })
}
