import { getEventsListExtra } from './get-extra'

export async function editEventsList(ctx, page) {
    const { text, markup } = await getEventsListExtra(page)
    ctx.editMessageText(text, markup)
}
