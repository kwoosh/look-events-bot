import sendList from '../actions/events/sendList'
import { commandNames } from '../strings'

export default function(bot) {
    bot.command(commandNames['eventsList'], async ctx => {
        sendList(4, ctx)
    })
}
