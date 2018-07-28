import Telegraf, { CustomContextMessage } from 'telegraf'
import sendInfo from '../actions/reminders/sendInfo'
import { hearMessages } from '../strings'

export default function(bot: Telegraf<CustomContextMessage>) {
    bot.hears(hearMessages['reminder'], ctx => {
        if (!ctx.match) return

        sendInfo(Number(ctx.match[1]), ctx)
    })
}
