import moment from 'moment'
import { buttons } from './buttons'
import { commandNames } from './commandNames'

export function hashtagArray(arr, joiner) {
    const invalidChars = /(\s|-)/i
    const _ = '_'

    return arr.map(elem => `#${elem.replace(invalidChars, _)}`).join(joiner)
}

export const replies = {
    yourReminders: '<b>Ваши напоминания</b> 📆\n\n',
    deleteReminder: `\nЧто бы удалить напоминание нажмите на кнопку [<b>${buttons.delete}</b>] под карточкой напоминания.`,
    whenToRemind: 'Когда нужно напомнить?',
    lateForReminders: '😱Уже слишкмо <b>поздно</b> для напоминаний, это cобитие проводиться сегодня, поспеши!',
    reminderDeleted: `Напоминание <b>удалено</b> ☑️\n\nОстальные напоминания 👉 /${commandNames.myReminders}`,
    reminderNonExist: `У вас нету такого напоминания 🤷🏼‍♂️ \n\nПроверьте еще раз 👉 /${commandNames.myReminders}`,
    remindersEmpty: 'У вас пока нету напоминаний 🤗\n\n',
    eventNotFound: 'Хмм... 😕 Не могу найти такое событие 🤷🏼‍♂️\nМожет быть, оно уже проло, и ты все пропустил? 😜',

    reminderCreated(title, date) {
        return `Успешно создано новое напоминание про <b>${title}</b> на <b>${moment(date).format('D MMMM')}</b>📌

Список напоминаний 👉 /${commandNames.myReminders}`
    },

    reminderExist(title, remidnerID) {
        return `У вас уже существует напоминание про <b>${title}</b> на эту дату 😑 (/${commandNames.r}${remidnerID})

Попробуйте создать напоминание на другую дату 👍`
    },

    singleLine(title, remidnerID, reminderDate) {
        const TITLE_MAX_LENGTH = 45
        if (title.length > TITLE_MAX_LENGTH) title = title.slice(0, TITLE_MAX_LENGTH).trim() + '...'

        const date = moment(reminderDate).format('D MMMM')

        return `💡 <b>${date}</b> (/${commandNames.r}${remidnerID}) ${title}\n\n`
    },

    getReminderInfo(r, e) {
        return `📝 Информация о напоминании: (/${commandNames.r}${r.id})

Событие: <b>${e.title}</b> (/${commandNames.e}${e.id})

Когда напомнить: <b>${moment(r.date).format('D MMMM')}</b>
Начало события: <b>${e.time.raw}</b>

Остальные напоминания 👉 /${commandNames.myReminders}`
    },

    getReminderCard(r, e) {
        const date = moment(e.time.dates[0]).format('D MMMM')
        const diff = moment(e.time.dates[0]).diff(moment(r.date), 'days')

        let when /* : string */ = ''

        if (diff === 1) when = 'завтра'
        else if (diff === 3) when = 'через 3 дня'
        else if (diff === 7) when = 'через неделю'

        const isOnline = e.places.includes('Online')
        const city = e.places.filter(place => place !== 'Online')[0]
        const placeText = isOnline ? 'в Онлайне' : `в городе <b>${city}</b>`

        return `💡 <b>Напоминание!</b>

Уже ${when} 😱, а точнее ${date} ${placeText} пройдет событие <b>${e.title}</b> (/${commandNames.e}${e.id})

👌 Подробнее про событие <a href="${e.link}">тут</a> 👈

<b>Такое нельзя пропустить 😍🤑🤓</b>
`
    },

    getEventCard(e) {
        return `
<b>${e.title}</b>

📅 ${e.time.raw}
⛳️ ${hashtagArray(e.places, ' ')}
💵 ${e.price}

${e.description}
${hashtagArray(e.topics, ' ')}
<a href="${e.image}">&#8205;</a>
${e.link}`
    },
}
