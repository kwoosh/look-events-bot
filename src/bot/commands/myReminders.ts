import Telegraf, { CustomContextMessage } from 'telegraf'
import sendList from '../actions/reminders/sendList'
import { commandNames } from '../strings'

export default function(bot: Telegraf<CustomContextMessage>) {
    bot.command(commandNames['myReminders'], async ctx => {
        sendList(ctx)
    })
}
