import Telegraf, { CustomContextMessage } from 'telegraf'
import sendCard from '../actions/events/sendCard'
import { hearMessages } from '../strings'

export default function(bot: Telegraf<CustomContextMessage>) {
    bot.hears(hearMessages['event'], ctx => {
        if (!ctx.match) return

        sendCard(Number(ctx.match[1]), ctx)
    })
}
