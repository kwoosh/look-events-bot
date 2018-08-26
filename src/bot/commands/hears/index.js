import sendEventCard from './sendEventCard'
import sendReminderInfo from './sendReminderInfo'

const hearMessages = {
    reminder: /\/r(\d+)/,
    event: /\/e(\d+)/,
}

export function setupHearsCommands(bot) {
    bot.hears(hearMessages['event'], sendEventCard)
    bot.hears(hearMessages['reminder'], sendReminderInfo)
}
