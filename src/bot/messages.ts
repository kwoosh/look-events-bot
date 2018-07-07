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

export const reminders = {
    reminderCreated(title: string, date: string) {
        return `Напоминание про <b>${title}</b> создано на дату <b>${date}</b>`
    },

    reminderExist(title: string, date: string) {
        return `На дату <b>${date}</b> у вас уже существует напоминание про <b>${title}</b>!`
    },

    lateForReminders(title: string) {
        return `Уже слишкмо <b>поздно</b> для напоминаний, cобитие <b>${title}</b> проводиться сегодня, поспеши!`
    },

    whenToRemind(title: string) {
        return `Когда нужно напомнить про <b>${title}</b>?`
    },
}

export const replies = {
    eventNotFound: 'Хмм... 😕 Не могу найти такое событие 🤷🏼‍♂️ \nМожет быть, оно уже проло, и ты все пропустил? 😜',
}

export const commandReplies = {
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

export const REMIND_DAYS = [{ days: 1, text: 'За день' }, { days: 3, text: 'За 3 дня' }, { days: 7, text: 'За неделю' }]
