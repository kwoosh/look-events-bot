import * as mysql from 'mysql'
import config from '../config'
import { RemindersDB } from './reminders'
import { UsersDB } from './users'

const database = mysql.createConnection(process.env.DB_URI || config.DB_URI)

class DB {
    users: UsersDB
    reminders: RemindersDB

    constructor() {
        database.connect(err => {
            if (err) throw err
            console.log('Connected to db!')
        })

        this.users = new UsersDB(database)
        this.reminders = new RemindersDB(database)
    }
}

export default new DB()
export { Reminder } from './reminders'
export { User } from './users'
