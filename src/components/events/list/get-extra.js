import api from '../../../common/api'
import { getPaginationKeyboard } from '../../../common/utils/pagination'
import { replies } from '../../../common/strings'

export const EVENTS_LIMMIT = 10

export async function getEventsListExtra(page) {
    const offset = Number(page) * EVENTS_LIMMIT - EVENTS_LIMMIT
    const events = await api.getList({ limit: EVENTS_LIMMIT, offset })
    const eventsCount = await api.getCount()
    const totalPages = Math.ceil(eventsCount / EVENTS_LIMMIT)

    const markup = getPaginationKeyboard(page, totalPages, 'events-change-page')
    const text = replies.getEventsList(events, page)

    return { text, markup }
}
