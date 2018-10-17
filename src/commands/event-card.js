import { sendCard } from '../components/events/card/send'

export default function(ctx) {
    if (!ctx.match) return
    sendCard(Number(ctx.match[1]), ctx)
}
