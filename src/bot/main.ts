import Telegraf from 'telegraf'
import config from '../config'
import db from '../db'
import askForRemindDay from './actions/reminder/askForRemindDay'
import newReminder from './actions/reminder/newReminder'
import { sendCard } from './actions/send'
import { BUTTON_TYPES } from './buttons'
import { commandReplies } from './messages'

const bot = new Telegraf(config.BOT_TOKEN)

bot.start(ctx => {
    ctx.reply(commandReplies.start)

    db.addUser(ctx.from.id, ctx.from.username)
})

bot.hears(/\/e(\d+)/, ctx => {
    sendCard(Number(ctx.match[1]), ctx)
})

bot.on('callback_query', async ctx => {
    type QueryData = { type: string; payload: any }
    const { type, payload }: QueryData = JSON.parse(ctx.callbackQuery.data)

    switch (type) {
        case BUTTON_TYPES['reminder-ask']:
            askForRemindDay(Number(payload.eventID), ctx)
            break

        case BUTTON_TYPES['reminder-new']:
            newReminder(Number(payload.eventID), Number(payload.days), Number(payload.msgID), ctx)
            break

        default:
            console.log(`Unhandled callback_query from @${ctx.callbackQuery.from.username}`)
            break
    }

    ctx.answerCallbackQuery()
})

bot.startPolling()
