import { sendEventsList } from '../actions/eventsList'

export default async function(ctx) {
    sendEventsList(ctx, 1)
}
