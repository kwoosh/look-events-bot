import * as moment from 'moment'
import Telegraf from 'telegraf'
import { api } from '../api'
import config from '../config'
import { askForRemindDay } from './actions/remind'
import { sendCard } from './actions/send'
import { BUTTON_TYPES } from './buttons'
import { getRemindDate } from './dates'

const bot = new Telegraf(config.BOT_TOKEN)

bot.hears(/\/e(\d+)/, ctx => {
    sendCard(Number(ctx.match[1]), ctx)
})

bot.on('callback_query', async ctx => {
    type QueryData = { type: string; payload: any }
    const { type, payload }: QueryData = JSON.parse(ctx.callbackQuery.data)

    switch (type) {
        case BUTTON_TYPES['reminder:event']:
            askForRemindDay(Number(payload.eventID), ctx)
            break

        case BUTTON_TYPES['reminder:when']:
            const event = await api.get(Number(payload.eventID))
            const remindDate = getRemindDate(moment(event.time.dates[0]), Number(payload.days))
            // check if reminder exist
            // write Reminder To DB
            console.log(event, payload)
            break

        default:
            console.log(`Unhandled callback_query from @${ctx.callbackQuery.from.username}`)
            break
    }

    ctx.answerCallbackQuery()
})

bot.startPolling()
