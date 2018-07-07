export function makeCallbackButton(text: string, type: string, payload: any) {
    const button = {
        callback_data: JSON.stringify({ type, payload }),
        text,
    }

    return button
}

export function makeWhenButton(text: string, days: number, eventID: number, msgID: number) {
    return makeCallbackButton(text, BUTTON_TYPES['reminder-new'], { eventID, days, msgID })
}

export const BUTTON_TYPES = {
    'reminder-ask': 'r:a',
    'reminder-new': 'r:n',
    'reminder-delete': 'r:d',
}
