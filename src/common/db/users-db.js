import createUserModel from './models/user'

export class UsersDB {
    constructor(connection) {
        this.model = createUserModel(connection)
    }

    create(user) {
        return this.model
            .create({
                id: user.id,
                ...user,
            })
            .catch(console.error)
    }

    get(id) {
        return this.model
            .findOne({ id })
            .exec()
            .catch(console.error)
    }

    updateSettings(id, settings) {
        return this.model.where({ id }).update({ settings })
    }
}
