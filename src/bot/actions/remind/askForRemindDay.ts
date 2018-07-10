import moment from 'moment'
import { CustomContextMessage } from 'telegraf'
import api from '../../../api'
import { makeWhenButton } from '../../buttons'
import remindersMessages from '../../messages/reminders'

export const REMIND_DAYS = [{ days: 1, text: 'За день' }, { days: 3, text: 'За 3 дня' }, { days: 7, text: 'За неделю' }]

export default async function(eventID: number, ctx: CustomContextMessage) {
    if (!ctx.callbackQuery) return

    const event = await api.get(eventID)

    const startDate = moment(event.time.dates[0])
    const diff = startDate.diff(moment(), 'day')
    const callbackQueryMessage = ctx.callbackQuery.message
    const msgID = callbackQueryMessage ? callbackQueryMessage.message_id : 0

    if (diff === 0) {
        ctx.replyWithHTML(remindersMessages.lateForReminders, { reply_to_message_id: msgID })
    } else {
        const buttonsRow: any[] = []

        REMIND_DAYS.forEach(({ days, text }) => {
            if (diff >= days) buttonsRow.push(makeWhenButton(text, days, event.id, msgID))
        })

        ctx.replyWithHTML(remindersMessages.whenToRemind, {
            reply_to_message_id: msgID,
            reply_markup: { inline_keyboard: [buttonsRow] },
        })
    }
}
