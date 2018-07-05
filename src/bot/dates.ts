import * as moment from 'moment'

export function getRemindDate(exactDate: moment.MomentInput, days: number) {
    return moment(exactDate).subtract(days, 'days')
}
