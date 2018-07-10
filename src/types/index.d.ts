import * as telegraf from 'telegraf'
import * as tt from 'telegraf/typings/telegram-types'

declare module 'telegraf' {
    export interface CustomContextMessage extends telegraf.ContextMessageUpdate {
        match?: RegExpMatchArray
        updateType?: tt.UpdateType
        updateSubTypes?: tt.MessageSubTypes
    }
}
