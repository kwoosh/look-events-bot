import mongoose from 'mongoose'
import { RemindersDB } from './reminders-db'
import { UsersDB } from './users-db'

class DB {
    constructor() {
        const connection = mongoose.createConnection(process.env.DB_URI, {
            useNewUrlParser: true,
        })

        connection.on('error', error => {
            console.error('Databse connection error: ', error)
        })

        connection.once('open', () => {
            console.log('Connected to database (^_^)')
        })

        this.users = new UsersDB(connection)
        this.reminders = new RemindersDB(connection)
    }
}

export default new DB()
