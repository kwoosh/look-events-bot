import axios from 'axios'

class EventsAPI {
    constructor() {
        this.url = 'events'
        this.doRequest = axios.create({
            baseURL: process.env.LOOK_EVENTS_API,
        })
    }

    get(id) {
        return this.doRequest({
            method: 'get',
            url: `${this.url}/${Number(id)}`,
        }).then(res => res.data)
    }

    getList(params = {}) {
        return this.doRequest({
            method: 'get',
            url: `${this.url}/`,
            params,
        }).then(res => res.data)
    }

    getCount() {
        return this.doRequest({
            method: 'get',
            url: `${this.url}/count`,
        }).then(res => res.data)
    }
}

export default new EventsAPI()
