// import { Client } from 'pg'
require('dotenv').config()
const pg = require('pg')

 const whatever = async () => {
  const client = new pg.Client({
      host: process.env.DATABASE_URL,
      port: process.env.PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    })

  await client.connect()

  const result = await client.query('SELECT NOW()')
  console.log(result)
  
  await client.end()
}

module.exports = whatever