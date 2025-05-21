require('dotenv').config()

const { Pool } = require('pg')

const DbConfig = {
    
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}

export async function executeSQL(sqlScript) {
    try {
        const poll = new Pool(DbConfig)
        const client = await poll.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)

    } catch (error) {
        console.log('Erro ao executar SQL ' + error)
    }
 
}