import { editEventsList } from '../actions/eventsList'
import { cbQueryTypes } from '../strings'
import askForDay from './askForDay'
import createReminder from './createReminder'
import deleteReminder from './deleteReminder'

function parseCallbackQueryData(data) {
    if (!data) return { type: '', payload: [] }

    const [type, payload] = data.split('|')

    return { type, payload: payload.split(':') }
}

export function setupCallbacksAnswers(bot) {
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

        ctx.answerCallbackQuery()
    })
}
