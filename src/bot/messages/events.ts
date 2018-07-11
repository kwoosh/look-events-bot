import { Event } from '../../api'

export function hashtagArray(arr: string[], joiner: string) {
    const invalidChars = /(\s|-)/i
    const _ = '_'

    return arr.map(elem => `#${elem.replace(invalidChars, _)}`).join(joiner)
}

export default {
    eventNotFound: 'Хмм... 😕 Не могу найти такое событие 🤷🏼‍♂️\nМожет быть, оно уже проло, и ты все пропустил? 😜',

    getEventCard(e: Event) {
        return `
<b>${e.title}</b>

📅 ${e.time.raw}
⛳️ ${hashtagArray(e.places, ' ')}
💵 ${e.price}

${e.description}
${hashtagArray(e.topics, ' ')}
<a href="${e.image}">&#8205;</a>
${e.link}`
    },
}
