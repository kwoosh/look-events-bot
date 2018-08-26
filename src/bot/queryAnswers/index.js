import { cbQueryTypes } from '../strings'
import askForDay from './askForDay'
import createReminder from './createReminder'
import removeReminder from './removeReminder'
import { generateListWithPagination } from '../actions/events/sendList'

function parseCallbackQueryData(data) {
    if (!data) return { type: '', payload: [] }

    const [type, payload] = data.split('|')

    return { type, payload: payload.split(':') }
}

export default function(bot) {
    bot.on('callback_query', async ctx => {
        if (!ctx.callbackQuery) return

        const { type, payload } = parseCallbackQueryData(ctx.callbackQuery.data)

        switch (type) {
            case cbQueryTypes['reminder-ask']: {
                askForDay(payload, ctx)
                break
            }
            case cbQueryTypes['reminder-new']: {
                createReminder(payload, ctx)
                break
            }
            case cbQueryTypes['reminder-delete']: {
                removeReminder(payload, ctx)
                break
            }
            case cbQueryTypes['events-change-page']: {
                const [newPage] = payload
                console.log({ newPage })

                const { markup, messageText } = await generateListWithPagination(newPage)

                ctx.editMessageText(messageText, markup)
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
