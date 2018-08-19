import sendInfo from '../actions/reminders/sendInfo'
import { hearMessages } from '../strings'

export default function(bot) {
    bot.hears(hearMessages['reminder'], ctx => {
        if (!ctx.match) return

        sendInfo(Number(ctx.match[1]), ctx)
    })
}
