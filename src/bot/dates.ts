import moment from 'moment'

export function getRemindDate(exactDate: moment.MomentInput, days: number) {
    return moment(exactDate).subtract(days, 'days')
}

export function format(date: moment.Moment) {
    return date.format('YYYY-MM-DD')
}

export function isSameDate(first: moment.Moment, second: moment.Moment) {
    return format(first) === format(second)
}
