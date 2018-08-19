import sendList from '../actions/reminders/sendList'
import { commandNames } from '../strings'

export default function(bot) {
    bot.command(commandNames['myReminders'], async ctx => {
        sendList(ctx)
    })
}
