import { isReminderExist } from '../src/bot/actions/remind/newReminder'
import moment from 'moment'

const createReminder = (id, date) => ({ eventID: 69, messageID: 777, userID: 3, id, date: `2018-07-${date}` })

describe('isExist function', () => {
    test('Should return true if reminder on date allready exists', () => {
        const remindDate = moment('2018-07-10')

        const reminders = [createReminder(1, '10'), createReminder(2, '08'), createReminder(3, '04'), createReminder(4, '03')]

        expect(isReminderExist(remindDate, reminders)).toBeTruthy()
    })

    test('Should return false if reminder on date does not exist', () => {
        const remindDate = moment('2018-07-10')
        const reminders = [createReminder(1, '11'), createReminder(2, '08'), createReminder(3, '04'), createReminder(4, '12')]

        expect(isReminderExist(remindDate, reminders)).toBeFalsy()
    })

    test('Should return false if reminders array is empty', () => {
        const remindDate = moment('2018-07-10')
        const reminders = []

        expect(isReminderExist(remindDate, reminders)).toBeFalsy()
    })
})
