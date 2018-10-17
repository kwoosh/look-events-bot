import { sendEventsList } from '../components/events/list/send'

export default async function(ctx) {
    sendEventsList(ctx, 1)
}
