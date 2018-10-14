export class UsersDB {
    constructor(connection) {
        this.tabaleName = 'users'
        this.connection = connection

        this.createTable()
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS ${this.tabaleName} (
            id INT PRIMARY KEY,
            name VARCHAR(255)    
        )`

        this.connection.query(sql, err => {
            if (err) throw err
        })
    }

    create(id, username) {
        const sql = `INSERT IGNORE INTO ${this.tabaleName} (id, name) VALUES (${id}, '${username || ''}')`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, err => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    get(id) {
        const sql = `SELECT * FROM ${this.tabaleName} WHERE id = ${id}`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results /* : User[] */) => {
                if (err) reject(err)

                resolve(results[0])
            })
        })
    }
}
