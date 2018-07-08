import * as moment from 'moment'
import { ContextMessageUpdate } from 'telegraf'
import api from '../../../api'
import { makeWhenButton } from '../../buttons'
import remindersMessages from '../../messages/reminders'

export const REMIND_DAYS = [{ days: 1, text: 'За день' }, { days: 3, text: 'За 3 дня' }, { days: 7, text: 'За неделю' }]

export default async function(eventID: number, ctx: ContextMessageUpdate) {
    const event = await api.get(eventID)

    const startDate = moment(event.time.dates[0])
    const diff = startDate.diff(moment(), 'day')
    const msgID = ctx.callbackQuery.message.message_id

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
