const nodeFetch = require('node-fetch')
require('dotenv').config()
var query = require('../../bin/database.js');

module.exports = getPoolTableBooked = async (req, res, next) => {
  console.log('get "pool-table-booked" route hit');
  try {
    
    result = await query(`SELECT * from bookings ORDER BY bookings_id DESC LIMIT 1;`)

    
    console.log(result)

    const now = (new Date()) - 0

    const endTime = result.rows[0].end_time

    const isBooked = (new Date(endTime)) - 0 > now

    res.send({ isBooked, endTime })
    // return json.results || error
  } catch (e) {
    console.log(e)
    return { error: e }
  }
}
