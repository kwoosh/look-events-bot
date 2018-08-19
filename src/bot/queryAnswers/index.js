import Telegraf, { CustomContextMessage } from 'telegraf'
import { cbQueryTypes } from '../strings'
import askForDay from './askForDay'
import createReminder from './createReminder'
import removeReminder from './removeReminder'

// type QueryData = { type: string; payload: string[] }

// function parseCallbackQueryData(data: string | undefined): QueryData {
function parseCallbackQueryData(data) {
    if (!data) return { type: '', payload: [] }

    const [type, payload] = data.split('|')

    return { type, payload: payload.split(':') }
}

export default function(bot /*: Telegraf<CustomContextMessage> */) {
    bot.on('callback_query', async ctx => {
        if (!ctx.callbackQuery) return

        const { type, payload } = parseCallbackQueryData(ctx.callbackQuery.data)

        switch (type) {
            case cbQueryTypes['reminder-ask']:
                askForDay(payload, ctx)
                break

            case cbQueryTypes['reminder-new']:
                createReminder(payload, ctx)
                break

            case cbQueryTypes['reminder-delete']:
                removeReminder(payload, ctx)
                break

            case cbQueryTypes['events-change-page']:
                const [lastOffset, direction] = payload
                console.log({ lastOffset, direction })
                break

            default:
                console.log(`Unhandled callback_query from @${ctx.callbackQuery.from.username}`)
                break
        }

        ctx.answerCallbackQuery()
    })
}
