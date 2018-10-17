import 'dotenv/config'

import moment from 'moment'
import Telegraf from 'telegraf'

import { sendReminderCard } from './components/reminders/card/send'
import { setupCallbackAnswers } from './callbacks'
import { setupCommands } from './commands'

moment.locale('ru')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.catch(err => {
    // todo: upgrade
    console.log('Ooops', err)
})

setupCommands(bot)
setupCallbackAnswers(bot)

setInterval(() => {
    // todo: add cron
    sendReminderCard(bot)
}, 1000 * 60 * 10)

bot.startPolling()
