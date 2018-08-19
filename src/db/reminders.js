import * as mysql from 'mysql'
import moment from 'moment'
import { format } from '../utils/dates'

// export type Reminder = {
//     id: number
//     userID: number
//     eventID: number
//     messageID: number
//     date: string
// }

export class RemindersDB {
    // tabaleName: string
    // connection: mysql.Connection

    constructor(connection /* : mysql.Connection */) {
        this.tabaleName = 'reminders'
        this.connection = connection

        this.createTable()
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS reminders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userID INT,
            messageID INT,
            eventID INT,
            date DATE
        )`

        this.connection.query(sql, err => {
            if (err) throw err
        })
    }

    // create(userID: number, eventID: number, messageID: number, date: string) {
    create(userID, eventID, messageID, date) {
        const sql = `INSERT INTO reminders (userID, eventID, messageID, date) VALUES (
            ${userID},
            ${eventID},
            ${messageID},
            '${date}'
        )`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, err => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    // get(userID: number, id: number): Promise<Reminder> {
    get(userID, id) {
        const sql = `SELECT * FROM reminders WHERE userID = ${userID} AND id = ${id}`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results /* : Reminder[] */) => {
                if (err) reject(err)

                resolve(results[0])
            })
        })
    }

    delete(id /* : number */) {
        const sql = `DELETE FROM reminders WHERE id = ${id}`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, err => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    // getList(userID: number, eventID?: number): Promise<Reminder[]> {
    getList(userID, eventID) {
        const withEvent = eventID ? `AND eventID = ${eventID}` : ''
        const sql = `SELECT * FROM reminders WHERE userID = ${userID} ${withEvent}`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results /* : Reminder[] */) => {
                if (err) reject(err)

                resolve(results)
            })
        })
    }

    getAllForToday() /* : Promise<Reminder[]> */ {
        const today = format(moment())
        const sql = `SELECT * FROM reminders WHERE date = '${today}'`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results /* : Reminder[] */) => {
                if (err) reject(err)

                resolve(results)
            })
        })
    }
}
