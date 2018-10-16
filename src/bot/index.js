import moment from 'moment'
import Telegraf from 'telegraf'

import { sendReminderCard } from './actions/reminderCard'
import { setupCallbacksAnswers } from './callbacks'
import { setupHearsCommands, setupStaticCommands } from './commands'

moment.locale('ru')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.catch(err => {
    console.log('Ooops', err)
})

export function startBot() {
    setupStaticCommands(bot)
    setupHearsCommands(bot)
    setupCallbacksAnswers(bot)

    setInterval(() => {
        sendReminderCard(bot)
    }, 1000 * 60 * 10)

    bot.startPolling()
}
