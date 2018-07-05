import { Event } from '../api'

function hashtagTopics(topics: string[]) {
    const invalidChars = /(\s|-)/i
    const _ = '_'

    return topics.map(topic => `#${topic.replace(invalidChars, _)}`).join(' ')
}

export function getEventCard(e: Event) {
    return `
<b>${e.title}</b>

📅 ${e.time.raw}
⛳️ ${e.places.join(', ')}
💵 ${e.price}

${e.description}
${hashtagTopics(e.topics)}

<a href="${e.image}">&#8205;</a>

${e.link}
`
}

export const BOT_REPLIES = {
    start: 'Привет! Используй клавиатуру ниже, чтобы вызывать команды. Если нужна помощь, то нажми /help',

    about: `
Идеи, жалобы, похвалу, а также по вопросам создания ботов писать сюда – @tobira
Все доступные команды: /help
Бот использует DOU.ua для полученя данных о события (https://dou.ua/calendar/)`,

    help: `
Все доступные команды:
/settings - настройки бота

О боте: /about`,
}

export const REMINDS = [{ days: 1, text: 'За день' }, { days: 3, text: 'За 3 дня' }, { days: 7, text: 'За неделю' }]
