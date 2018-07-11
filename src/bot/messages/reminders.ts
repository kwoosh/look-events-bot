import moment from 'moment'
import { Event } from '../../api'
import { Reminder } from '../../db'
import { commands } from '../commands'
import { BUTTONS } from '../buttons'

export default {
    yourReminders: '<b>Ваши напоминания</b> 📆\n\n',
    deleteReminder: `\nЧто бы удалить напоминание нажмите на кнопку [<b>${BUTTONS.texts.delete}</b>] под карточкой напоминания.`,
    whenToRemind: 'Когда нужно напомнить?',
    lateForReminders: '😱Уже слишкмо <b>поздно</b> для напоминаний, это cобитие проводиться сегодня, поспеши!',
    deleted: `Напоминание <b>удалено</b> ☑️\n\nОстальные напоминания 👉 /${commands.myReminders}`,
    reminderNonExist: `У вас нету такого напоминания 🤷🏼‍♂️ \n\nПроверьте еще раз 👉 /${commands.myReminders}`,
    remindersEmpty: 'У вас пока нету напоминаний 🤗',

    reminderCreated(title: string, date: string) {
        return `Успешно создано новое напоминание про <b>${title}</b> на <b>${moment(date).format('D MMMM')}</b>📌

Список напоминаний 👉 /${commands.myReminders}`
    },

    reminderExist(title: string, remidnerID: number) {
        return `У вас уже существует напоминание про <b>${title}</b> на эту дату 😑 (/${commands.reminder}${remidnerID})

Попробуйте создать напоминание на другую дату 👍`
    },

    singleLine(title: string, remidnerID: number, reminderDate: string) {
        const TITLE_MAX_LENGTH = 45
        if (title.length > TITLE_MAX_LENGTH) title = title.slice(0, TITLE_MAX_LENGTH).trim() + '...'

        const date = moment(reminderDate).format('D MMMM')

        return `💡 <b>${date}</b> (/${commands.reminder}${remidnerID}) ${title}\n\n`
    },

    getReminderInfo(r: Reminder, e: Event) {
        return `📝 Информация о напоминании: (/${commands.reminder}${r.id})

Событие: <b>${e.title}</b> (/${commands.event}${e.id})

Когда напомнить: <b>${moment(r.date).format('D MMMM')}</b>
Начало события: <b>${e.time.raw}</b>

Остальные напоминания 👉 /${commands.myReminders}`
    },
}
