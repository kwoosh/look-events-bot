export const buttons = {
    delete: 'Удалить!',
    remind: 'Напомнить =)',

    toPage: {
        first: n => `« ${n}`,
        last: n => `${n} »`,
        current: n => `· ${n} ·`,
        next: n => `${n} ›`,
        prev: n => `‹ ${n}`,
    },

    remindDays: [{ days: 1, text: 'За день' }, { days: 3, text: 'За 3 дня' }, { days: 7, text: 'За неделю' }],
}

export const cbQueryTypes = {
    'reminder-ask': 'ra',
    'reminder-new': 'rn',
    'reminder-delete': 'rd',
    'events-change-page': 'ecp',
}
