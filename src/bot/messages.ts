import { Event } from '../api'
import * as moment from 'moment'

export function hashtagTopics(topics: string[]) {
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

export const remindersMessages = {
    static: {
        yourReminders: '<b>Ваши напоминания 📆</b>\n\n',
        deleteReminder: '\nЧто бы удалить напоминание - нажмте на кнопку <i>удалить</i> под карточкой напоминания.',
    },

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

    singleLine(title: string, date: string, id: number) {
        if (title.length > 40) title = title.slice(0, 40) + '...'

        return `● <b>${moment(date).format('D MMMM')}</b> ${title} (/r${id})\n`
    },
}

export const replies = {
    eventNotFound: 'Хмм... 😕 Не могу найти такое событие 🤷🏼‍♂️ \nМожет быть, оно уже проло, и ты все пропустил? 😜',
}

export const commandReplies = {
    start: 'Привет! Используй клавиатуру ниже, чтобы вызывать команды. Если нужна помощь, то нажми /help',

    about: `Look Events Bot - это телеграм-бот,
который поможет тебе следить за событиями в мире IT

Идеи, жалобы, похвалу, а также по вопросам создания ботов писать сюда – @tobira
Нашли ошибку или неправильное поведение бота - @tobira
Все доступные команды: /help
Бот использует DOU.ua для полученя данных о событиях.`,

    help: `
Все доступные команды:
/settings - настройки бота
/reminders - список напоминаний

О боте: /about`,
}

export const REMIND_DAYS = [{ days: 1, text: 'За день' }, { days: 3, text: 'За 3 дня' }, { days: 7, text: 'За неделю' }]
