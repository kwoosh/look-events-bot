import sendEventCard from './sendEventCard'
import sendReminderInfo from './sendReminderInfo'

const hearMessages = {
    reminder: /\/r(\d+)/,
    event: /\/e(\d+)/,
    listByTags: /\/list_by_tags \(((([a-zA-Zа-яА-Я]),?)+)?\) \[((([a-zA-Zа-яА-Я]),?)+)?\]/,
}

export function setupHearsCommands(bot) {
    bot.hears(hearMessages['event'], sendEventCard)
    bot.hears(hearMessages['reminder'], sendReminderInfo)
}
