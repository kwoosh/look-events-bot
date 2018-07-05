import * as moment from 'moment'
import { ContextMessageUpdate } from 'telegraf'
import { api } from '../../api'
import { makeWhenButton } from '../buttons'
import { REMINDS } from '../messages'

export async function askForRemindDay(eventID: number, ctx: ContextMessageUpdate) {
    const event = await api.get(eventID)

    const startDate = moment(event.time.dates[0])
    const diff = startDate.diff(moment(), 'day')
    const msgID = ctx.callbackQuery.message.message_id

    console.log('the day difference is', diff)

    if (diff === 0) {
        ctx.replyWithHTML(`Уже слишкмо <b>поздно</b> для напоминаний, cобитие проводиться сегодня. Поспеши!`, {
            reply_to_message_id: msgID,
        })
    } else {
        const buttonsRow: any[] = []

        REMINDS.forEach(({ days, text }) => {
            if (diff >= days) buttonsRow.push(makeWhenButton(text, days, event.id, msgID))
        })

        ctx.replyWithHTML(`Когда нужно напомнить про <b>${event.title}</b>?`, {
            reply_to_message_id: msgID,
            reply_markup: { inline_keyboard: [buttonsRow] },
        })
    }
}
