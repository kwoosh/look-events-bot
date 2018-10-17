import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    username: String,
    language_code: { type: String, default: 'ru-UA' },
    settings: {
        remindTime: { type: String, default: '09:00' },
        tags: {
            places: { type: [String], default: [] },
            topics: { type: [String], default: [] },
        },
    },
})

export default connection => connection.model('User', UserSchema, 'users')
