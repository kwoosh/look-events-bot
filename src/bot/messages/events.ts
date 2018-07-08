import { Event } from '../../api'

export function hashtagTopics(topics: string[]) {
    const invalidChars = /(\s|-)/i
    const _ = '_'

    return topics.map(topic => `#${topic.replace(invalidChars, _)}`).join(' ')
}

export default {
    eventNotFound: 'Хмм... 😕 Не могу найти такое событие 🤷🏼‍♂️\nМожет быть, оно уже проло, и ты все пропустил? 😜',

    getEventCard(e: Event) {
        return `
<b>${e.title}</b>

📅 ${e.time.raw}
⛳️ ${e.places.join(', ')}
💵 ${e.price}

${e.description}
${hashtagTopics(e.topics)}
<a href="${e.image}">&#8205;</a>
${e.link}`
    },
}
