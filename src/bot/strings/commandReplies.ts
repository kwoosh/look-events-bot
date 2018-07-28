import { commandNames } from './commandNames'

export const commandReplies = {
    start: 'Привет! Используй клавиатуру ниже, чтобы вызывать команды. Если нужна помощь, то нажми /help',

    about: `Look Events Bot - это телеграм-бот,
который поможет тебе следить за событиями в мире IT

Идеи, жалобы, похвалу, а также по вопросам создания ботов писать сюда – @tobira
Нашли ошибку или неправильное поведение бота - @tobira
Все доступные команды: /${commandNames.help}
Бот использует DOU.ua для полученя данных о событиях.`,

    help: `
Все доступные команды:
/${commandNames.settings} - настройки бота
/${commandNames.myReminders} - список напоминаний

О боте: /${commandNames.about}`,
}
