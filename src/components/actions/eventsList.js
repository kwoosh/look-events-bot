import api from '../../api'
import { getPaginationKeyboard } from '../pagination'
import { replies } from '../strings'

export const EVENTS_LIMMIT = 10

async function getEventsListExtra(page) {
    const offset = Number(page) * EVENTS_LIMMIT - EVENTS_LIMMIT
    const events = await api.getList({ limit: EVENTS_LIMMIT, offset })
    const eventsCount = await api.getCount()
    const totalPages = Math.ceil(eventsCount / EVENTS_LIMMIT)

    const markup = getPaginationKeyboard(page, totalPages, 'events-change-page')
    const text = replies.getEventsList(events, page)

    return { text, markup }
}

export async function editEventsList(ctx, page) {
    const { text, markup } = await getEventsListExtra(page)
    ctx.editMessageText(text, markup)
}

export async function sendEventsList(ctx, page) {
    const { text, markup } = await getEventsListExtra(page)
    ctx.replyWithHTML(text, markup)
}
