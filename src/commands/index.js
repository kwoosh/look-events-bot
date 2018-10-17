import { commands, hearMessages } from '../common/strings'

import helpHandler from './help'
import startHandler from './start'
import aboutHandler from './about'

import eventsListHandler from './events-list'
import myRemindersHandler from './my-reminders'
import eventCardHandler from './event-card'
import reminderInfoHandler from './reminder-info'

export function setupCommands(bot) {
    bot.command(commands['start'], startHandler)
    bot.command(commands['about'], aboutHandler)
    bot.command(commands['help'], helpHandler)

    bot.command(commands['eventsList'], eventsListHandler)
    bot.command(commands['myReminders'], myRemindersHandler)

    bot.hears(hearMessages['event'], eventCardHandler)
    bot.hears(hearMessages['reminder'], reminderInfoHandler)
}
