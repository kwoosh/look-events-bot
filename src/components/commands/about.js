import { commands } from '../strings'

export default function(ctx) {
    ctx.replyWithHTML(`Look Events Bot - это телеграм-бот,
    который поможет тебе следить за событиями в мире IT
    
    Идеи, жалобы, похвалу, а также по вопросам создания ботов писать сюда – @tobira
    Нашли ошибку или неправильное поведение бота - @tobira
    Все доступные команды: /${commands.help}
    Бот использует DOU.ua для полученя данных о событиях.`)
}
