import { commands } from '../strings'

import aboutHandler from './about'
import helpHandler from './help'
import eventsListHandler from './eventsList'
import myRemindersHandler from './myReminders'
import startHandler from './start'

export { setupHearsCommands } from './hears'

export function setupStaticCommands(bot) {
    bot.command(commands['start'], startHandler)
    bot.command(commands['about'], aboutHandler)
    bot.command(commands['help'], helpHandler)
    bot.command(commands['eventsList'], eventsListHandler)
    bot.command(commands['myReminders'], myRemindersHandler)
}
