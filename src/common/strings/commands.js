export const commands = {
    eventsList: 'events_list',
    myReminders: 'my_reminders',
    settings: 'settings',
    start: 'start',
    about: 'about',
    help: 'help',

    r: 'r',
    e: 'e',
}

export const hearMessages = {
    reminder: /\/r(\d+)/,
    event: /\/e(\d+)/,
    listByTags: /\/list_by_tags \(((([a-zA-Zа-яА-Я]),?)+)?\) \[((([a-zA-Zа-яА-Я]),?)+)?\]/,
}
