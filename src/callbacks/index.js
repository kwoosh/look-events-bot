import { editEventsList } from '../components/events/list/edit'
import { cbQueryTypes } from '../common/strings'
import { askForDay } from '../components/events/card/ask'
import { createReminder } from '../components/reminders/create'
import { deleteReminder } from '../components/reminders/delete'

function parseCallbackQueryData(data) {
    if (!data) return { type: '', payload: [] }

    const [type, payload] = data.split('|')

    return { type, payload: payload.split(':') }
}

export function setupCallbackAnswers(bot) {
    bot.on('callback_query', async ctx => {
        if (!ctx.callbackQuery) return

        const { type, payload } = parseCallbackQueryData(ctx.callbackQuery.data)

        switch (type) {
            case cbQueryTypes['reminder-ask']: {
                askForDay(ctx, payload)
                break
            }
            case cbQueryTypes['reminder-new']: {
                createReminder(ctx, payload)
                break
            }
            case cbQueryTypes['reminder-delete']: {
                deleteReminder(ctx, payload)
                break
            }
            case cbQueryTypes['events-change-page']: {
                const [newPage] = payload
                editEventsList(ctx, Number(newPage))
                break
            }
            default: {
                console.log(`Unhandled callback_query from @${ctx.callbackQuery.from.username}`)
                break
            }
        }

        ctx.answerCbQuery()
    })
}
