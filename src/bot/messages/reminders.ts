import moment from 'moment'
import { Event } from '../../api'
import { Reminder } from '../../db'
import commands from '../commands'

export default {
    yourReminders: '<b>Ваши напоминания</b> 📆\n\n',
    deleteReminder: '\nЧто бы удалить напоминание нажмите на кнопку [<b>Удалить</b>] под карточкой напоминания.',
    whenToRemind: 'Когда нужно напомнить?',
    lateForReminders: '😱Уже слишкмо <b>поздно</b> для напоминаний, это cобитие проводиться сегодня, поспеши!',
    deleted: `Напоминание <b>удалено</b> ☑️\n\nОстальные напоминания 👉 /${commands.myReminders}`,
    reminderNonExist: `У вас нету такого напоминания 🤷🏼‍♂️ \n\nПроверьте еще раз 👉 /${commands.myReminders}`,
    remindersEmpty: 'У вас пока нету напоминаний 🤗',

    reminderCreated(title: string, date: string) {
        return `Успешно создано новое напоминание про <b>${title}</b> на дату <b>${date}</b>📌

Список напоминаний 👉 /${commands.myReminders}`
    },

    reminderExist(title: string, date: string, remidnerID: number) {
        return `На дату <b>${date}</b> у вас уже существует напоминание про <b>${title}</b>! (/${commands.reminder}${remidnerID})`
    },

    singleLine(title: string, date: string, id: number) {
        const titleMaxLength = 20
        if (title.length > titleMaxLength) title = title.slice(0, titleMaxLength) + '...'

        return `💡 <b>${moment(date).format('D MMMM')}</b> ${title} (/${commands.reminder}${id})\n`
    },

    getReminderCard(r: Reminder, e: Event) {
        return `Напоминание про <b>${e.title}</b> (/${commands.event}${e.id})

Когда Напомнить: <b>${moment(r.date).format('D MMMM')}</b>
Начало события: <b>${e.time.raw}</b>

Остальные напоминания 👉 /${commands.myReminders}`
    },
}
