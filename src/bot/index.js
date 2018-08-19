import moment from 'moment'
import sendReminderCard from './actions/reminders/sendCard'
import setupAbout from './commands/about'
import setupHelp from './commands/help'
import setupMyReminders from './commands/myReminders'
import setupEventsList from './commands/eventsList'
import setupStart from './commands/start'
import setupSingleEvent from './messages/getEvent'
import setupSingleReminder from './messages/getReminder'
import setupQueryAnswers from './queryAnswers'
import Telegraf from 'telegraf'

moment.locale('ru')

const bot = new Telegraf(process.env.BOT_TOKEN)

export function startBot() {
    setupStart(bot)
    setupHelp(bot)
    setupMyReminders(bot)
    setupEventsList(bot)
    setupAbout(bot)
    setupSingleEvent(bot)
    setupSingleReminder(bot)

    setupQueryAnswers(bot)

    setInterval(() => {
        sendReminderCard(bot)
    }, 1000 * 60 * 10)

    bot.startPolling()
}
