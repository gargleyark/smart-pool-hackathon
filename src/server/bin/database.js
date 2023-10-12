// import { Client } from 'pg'
require('dotenv').config()
const pg = require('pg')

const client = new pg.Client({
    host: process.env.DATABASE_URL,
    port: process.env.PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: true
})

async function connectDatabase(){
  client.connect(function (err) {
    if (!err) {
      console.log('Database is connected!');
    } else {
      console.log('Error connecting database!');
    }
  });
  return client
}

module.exports = connectDatabase();