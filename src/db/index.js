import * as mysql from 'mysql'
import { RemindersDB } from './reminders'
import { UsersDB } from './users'

// todo: rewrite by using ORM

class DB {
    constructor() {
        const database = mysql.createConnection(process.env.DB_URI)

        database.connect(err => {
            if (err) throw err
            console.log('Connected to db!')
        })

        this.users = new UsersDB(database)
        this.reminders = new RemindersDB(database)
    }
}

export default new DB()
