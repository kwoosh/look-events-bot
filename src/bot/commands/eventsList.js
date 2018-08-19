// import Telegraf, { CustomContextMessage } from 'telegraf'
import sendList from '../actions/events/sendList'
import { commandNames } from '../strings'

export default function(bot /* : Telegraf<CustomContextMessage> */) {
    bot.command(commandNames['eventsList'], async ctx => {
        sendList(0, ctx)
    })
}
