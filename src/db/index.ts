import * as mysql from 'mysql'
import config from '../config'

export type User = {
    id: number
    name: string
}

export type Reminder = {
    id: number
    userID: number
    eventID: number
    messageID: number
    date: string
}

const database = mysql.createConnection(process.env.DB_URI || config.DB_URI)

class DB {
    constructor() {
        database.connect(err => {
            if (err) throw err
            console.log('Connected to db!')
        })

        this.createUsersTable()
        this.createRemindersTable()
    }

    createUsersTable() {
        const sql = `CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY,
            name VARCHAR(255)    
        )`

        database.query(sql, err => {
            if (err) throw err
        })
    }

    createRemindersTable() {
        const sql = `CREATE TABLE IF NOT EXISTS reminders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userID INT,
            messageID INT,
            eventID INT,
            date DATE
        )`

        database.query(sql, err => {
            if (err) throw err
        })
    }

    addUser(id: number, username: string) {
        const sql = `INSERT IGNORE INTO users (id, name) VALUES (${id}, '${username || ''}')`

        return new Promise((resolve, reject) => {
            database.query(sql, err => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    getUser(id: number): Promise<User> {
        const sql = `SELECT * FROM users WHERE id = ${id}`

        return new Promise((resolve, reject) => {
            database.query(sql, (err, results: User[]) => {
                resolve(results[0])
            })
        })
    }

    addReminder(userID: number, eventID: number, messageID: number, date: string) {
        const sql = `INSERT INTO reminders (userID, eventID, messageID, date) VALUES (
            ${userID},
            ${eventID},
            ${messageID},
            '${date}'
        )`

        return new Promise((resolve, reject) => {
            database.query(sql, err => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    getReminders(userID: number, eventID?: number): Promise<Reminder[]> {
        const withEvent = eventID ? `AND eventID = ${eventID}` : ''
        const sql = `SELECT * FROM reminders WHERE userID = ${userID} ${withEvent}`

        return new Promise((resolve, reject) => {
            database.query(sql, (err, results: Reminder[]) => {
                if (err) reject(err)

                resolve(results)
            })
        })
    }

    getReminder(userID: number, id: number): Promise<Reminder> {
        const sql = `SELECT * FROM reminders WHERE userID = ${userID} AND id = ${id}`

        return new Promise((resolve, reject) => {
            database.query(sql, (err, results: Reminder[]) => {
                if (err) reject(err)

                resolve(results[0])
            })
        })
    }

    deleteReminder(id: number) {
        const sql = `DELETE FROM reminders WHERE id = ${id}`

        return new Promise((resolve, reject) => {
            database.query(sql, (err, results: Reminder[]) => {
                if (err) reject(err)
                resolve(results[0])
            })
        })
    }
}

export default new DB()
