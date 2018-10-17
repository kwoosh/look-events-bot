import mongoose from 'mongoose'

const ReminderSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userID: { type: Number, required: true },
    messageID: { type: Number, required: true },
    eventID: { type: Number, required: true },
    date: { type: Date, required: true },
})

export default connection => connection.model('Reminder', ReminderSchema, 'reminders')
