import moment from 'moment'
import Telegraf, { CustomContextMessage } from 'telegraf'
import config from '../config'
import sendReminderCard from './actions/reminders/sendCard'
import setupAbout from './commands/about'
import setupHelp from './commands/help'
import setupMyReminders from './commands/myReminders'
import setupStart from './commands/start'
import setupSingleEvent from './messages/getEvent'
import setupSingleReminder from './messages/getReminder'
import setupQueryAnswers from './queryAnswers'

moment.locale('ru')

const bot = new Telegraf<CustomContextMessage>(process.env.BOT_TOKEN || config.BOT_TOKEN)

function setupBot() {
    setupStart(bot)
    setupHelp(bot)
    setupMyReminders(bot)
    setupAbout(bot)
    setupSingleEvent(bot)
    setupSingleReminder(bot)

    setupQueryAnswers(bot)

    setInterval(() => {
        sendReminderCard(bot)
    }, 1000 * 60 * 10)

    bot.startPolling()
}

setupBot()
