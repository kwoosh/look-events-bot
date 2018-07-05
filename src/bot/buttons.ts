export function makeCallbackButton(text: string, type: string, payload: any) {
    const button = {
        callback_data: JSON.stringify({ type, payload }),
        text,
    }

    return button
}

export function makeWhenButton(text: string, days: number, eventID: number, msgID: number) {
    return makeCallbackButton(text, BUTTON_TYPES['reminder:when'], { eventID, days, msgID })
}

export const BUTTON_TYPES = {
    'reminder:event': 'r:e',
    'reminder:when': 'r:w',
}
