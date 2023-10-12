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
      ssl: true
    })

  await client.connect()

  const result = await client.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';")
  console.log(result)
  
  await client.end()
}

module.exports = whatever