import * as mysql from 'mysql'

export type User = {
    id: number
    name: string
}

export class UsersDB {
    tabaleName: string
    connection: mysql.Connection

    constructor(connection: mysql.Connection) {
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

    create(id: number, username: string) {
        const sql = `INSERT IGNORE INTO ${this.tabaleName} (id, name) VALUES (${id}, '${username || ''}')`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, err => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    get(id: number): Promise<User> {
        const sql = `SELECT * FROM ${this.tabaleName} WHERE id = ${id}`

        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results: User[]) => {
                resolve(results[0])
            })
        })
    }
}
