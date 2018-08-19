import moment from 'moment'

// export function getRemindDate(exactDate: moment.MomentInput, days: number) {
export function getRemindDate(exactDate, days) {
    return moment(exactDate).subtract(days, 'days')
}

// export function format(date: moment.Moment) {
export function format(date) {
    return date.format('YYYY-MM-DD')
}

// export function isSameDate(first: moment.Moment, second: moment.Moment) {
export function isSameDate(first) {
    return format(first) === format(second)
}
