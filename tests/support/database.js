const { Pool } = require('pg')

const DbConfig = {
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'pwd123',
    database: 'zombieplus'
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