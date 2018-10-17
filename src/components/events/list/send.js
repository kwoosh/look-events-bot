import { getEventsListExtra } from './get-extra'

export async function sendEventsList(ctx, page) {
    const { text, markup } = await getEventsListExtra(page)
    ctx.replyWithHTML(text, markup)
}
