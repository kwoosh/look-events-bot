import { commands } from '../strings'

export default function(ctx) {
    ctx.replyWithHTML(`
        Все доступные команды:
        /${commands.settings} - настройки бота
        /${commands.myReminders} - список напоминаний
        
        О боте: /${commands.about}`)
}
