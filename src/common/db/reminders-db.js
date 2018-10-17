import moment from 'moment'
import { format } from '../utils/dates'
import createReminderModel from './models/reminder'

export class RemindersDB {
    constructor(connection) {
        this.model = createReminderModel(connection)
    }

    async create(userID, eventID, messageID, date) {
        const max = await this.model
            .findOne()
            .sort({ id: -1 })
            .exec()
            .then(r => r.id)
            .catch(err => {
                // todo: handle it better
                console.log('no tiems in collection', err)
                return 0
            })

        return this.model
            .create({
                id: max + 1,
                userID,
                eventID,
                messageID,
                date,
            })
            .catch(console.error)
    }

    get(userID, id) {
        return this.model
            .findOne({ id, userID })
            .exec()
            .catch(console.error)
        // const sql = `SELECT * FROM reminders WHERE userID = ${userID} AND id = ${id}`

        // return new Promise((resolve, reject) => {
        //     this.connection.query(sql, (err, results) => {
        //         if (err) reject(err)

        //         resolve(results[0])
        //     })
        // })
    }

    delete(id) {
        return this.model
            .deleteOne({ id })
            .exec()
            .catch(console.error)
    }

    getList(userID, eventID) {
        const withEvent = eventID ? { eventID } : {}

        return this.model
            .find({ userID, ...withEvent })
            .exec()
            .catch(console.error)
    }

    getAllForToday() {
        const today = format(moment())

        this.model
            .find({ date: today })
            .exec()
            .catch(console.error)
    }
}
