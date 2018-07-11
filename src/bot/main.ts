import Telegraf, { CustomContextMessage } from 'telegraf'
import moment from 'moment'
import config from '../config'
import db from '../db'
import askForRemindDay from './actions/remind/askForRemindDay'
import deleteReminder from './actions/remind/deleteReminder'
import remindersList from './actions/send/remindersList'
import newReminder from './actions/remind/newReminder'
import { sendEventCard } from './actions/send/eventCard'
import { sendReminderInfo } from './actions/send/reminderInfo'
import { BUTTONS } from './buttons'
import { commands, toHear } from './commands'
import staticReplies from './messages/staticReplies'

moment.locale('ru')
const bot = new Telegraf<CustomContextMessage>(process.env.BOT_TOKEN || config.BOT_TOKEN)

bot.start(ctx => {
    if (!ctx.from) return
    db.addUser(ctx.from.id, ctx.from.username || '')
    ctx.replyWithHTML(staticReplies.start)
})

bot.command(commands['help'], ctx => {
    ctx.replyWithHTML(staticReplies['help'])
})

bot.command(commands['about'], ctx => {
    ctx.replyWithHTML(staticReplies['about'])
})

bot.command(commands['myReminders'], async ctx => {
    remindersList(ctx)
})

bot.hears(toHear['reminder'], ctx => {
    if (!ctx.match) return
    sendReminderInfo(Number(ctx.match[1]), ctx)
})

bot.hears(toHear['event'], ctx => {
    if (!ctx.match) return
    sendEventCard(Number(ctx.match[1]), ctx)
})

bot.on('callback_query', async ctx => {
    if (!ctx.callbackQuery) return
    type QueryData = { type: string; payload: any }
    const data = JSON.parse(ctx.callbackQuery.data || '')
    const { type, payload }: QueryData = data

    switch (type) {
        case BUTTONS.types['reminder-ask']:
            askForRemindDay(Number(payload.eventID), ctx)
            break

        case BUTTONS.types['reminder-new']:
            newReminder(Number(payload.eventID), Number(payload.days), Number(payload.msgID), ctx)
            break

        case BUTTONS.types['reminder-delete']:
            deleteReminder(Number(payload.reminderID), ctx)
            break

        default:
            console.log(`Unhandled callback_query from @${ctx.callbackQuery.from.username}`)
            break
    }

    ctx.answerCallbackQuery()
})

bot.startPolling()
