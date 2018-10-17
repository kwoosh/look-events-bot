import { sendInfo } from '../components/reminders/info/send'

export default function(ctx) {
    if (!ctx.match) return

    sendInfo(Number(ctx.match[1]), ctx)
}
