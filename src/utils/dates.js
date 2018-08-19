import moment from 'moment'

export function getRemindDate(exactDate, days) {
    return moment(exactDate).subtract(days, 'days')
}

export function format(date) {
    return date.format('YYYY-MM-DD')
}

export function isSameDate(first, second) {
    return format(first) === format(second)
}
