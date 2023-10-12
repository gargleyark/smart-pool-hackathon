// import { Client } from 'pg'
require('dotenv').config()
const pg = require('pg')

const client = new pg.Client({
    host: process.env.DATABASE_URL,
    port: process.env.DATABSE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: true
})

async function query(sql){
  await client.connect();
  const result = await client.query(sql);
  await client.end();
  return result
}

module.exports = query;