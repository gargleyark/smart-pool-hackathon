// import { Client } from 'pg'
require('dotenv').config()
const pg = require('pg')

async function query(sql){

const client = new pg.Client({
  host: process.env.DATABASE_URL,
  port: process.env.DATABSE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: true
})

  await client.connect();
  const result = await client.query(sql);
  await client.end();
  return result
}

module.exports = query;