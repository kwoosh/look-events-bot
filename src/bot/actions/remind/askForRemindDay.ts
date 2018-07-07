import * as moment from 'moment'
import { ContextMessageUpdate } from 'telegraf'
import api from '../../../api'
import { makeWhenButton } from '../../buttons'
import { remindersMessages, REMIND_DAYS } from '../../messages'

export default async function(eventID: number, ctx: ContextMessageUpdate) {
    const event = await api.get(eventID)

    const startDate = moment(event.time.dates[0])
    const diff = startDate.diff(moment(), 'day')
    const msgID = ctx.callbackQuery.message.message_id

    if (diff === 0) {
        ctx.replyWithHTML(remindersMessages.lateForReminders(event.title), {
            reply_to_message_id: msgID,
        })
    } else {
        const buttonsRow: any[] = []

        REMIND_DAYS.forEach(({ days, text }) => {
            if (diff >= days) buttonsRow.push(makeWhenButton(text, days, event.id, msgID))
        })

        ctx.replyWithHTML(remindersMessages.whenToRemind(event.title), {
            reply_to_message_id: msgID,
            reply_markup: { inline_keyboard: [buttonsRow] },
        })
    }
}
