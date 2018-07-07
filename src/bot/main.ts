import Telegraf from 'telegraf'
import config from '../config'
import db from '../db'
import askForRemindDay from './actions/reminder/askForRemindDay'
import newReminder from './actions/reminder/newReminder'
import listReminders from './actions/reminder/listReminders'
import { sendEventCard } from './actions/send/eventCard'
import { sendReminderCard } from './actions/send/reminderCard'
import { BUTTON_TYPES } from './buttons'
import { commandReplies } from './messages'

const bot = new Telegraf(process.env.BOT_TOKEN || config.BOT_TOKEN)

bot.start(ctx => {
    db.addUser(ctx.from.id, ctx.from.username)
    ctx.replyWithHTML(commandReplies.start)
})

bot.command('help', ctx => {
    ctx.replyWithHTML(commandReplies.help)
})

bot.command('about', ctx => {
    ctx.replyWithHTML(commandReplies.about)
})

bot.command('reminders', async ctx => {
    listReminders(ctx)
})

bot.hears(/\/r(\d+)/, ctx => {
    sendReminderCard(Number(ctx.match[1]), ctx)
})

bot.hears(/\/e(\d+)/, ctx => {
    sendEventCard(Number(ctx.match[1]), ctx)
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

        case BUTTON_TYPES['reminder-delete']:
            // db.deleteReminder(Number(payload.reminderID)).then(() => {
            //    console.log('deleted')
            //})
            break

        default:
            console.log(`Unhandled callback_query from @${ctx.callbackQuery.from.username}`)
            break
    }

    ctx.answerCallbackQuery()
})

bot.startPolling()
