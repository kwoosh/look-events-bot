export function makeCallbackButton(text: string, type: string, payload: any) {
    const button = {
        callback_data: JSON.stringify({ type, payload }),
        text,
    }

    return button
}

export function makeWhenButton(text: string, days: number, eventID: number, msgID: number) {
    return makeCallbackButton(text, BUTTONS.types['reminder-new'], { eventID, days, msgID })
}

export const BUTTONS = {
    types: {
        'reminder-ask': 'r:a',
        'reminder-new': 'r:n',
        'reminder-delete': 'r:d',
    },

    texts: {
        delete: 'Удалить!',
        remind: 'Напомнить =)',
    },
}
