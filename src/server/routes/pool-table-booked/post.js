var query = require('../../bin/database.js')
const fifthteen = 900000
module.exports = postPoolTableBooked = async (req, res, next) => {
  console.log('post "pool-table-booked" route hit')
  try {
    result = await query(
      `INSERT INTO bookings(start_time, end_time) VALUES (to_timestamp(${Date.now()} / 1000.0), to_timestamp((${Date.now()} + ${fifthteen}) / 1000.0));`
    )

    console.log(result)

    res.send({ result })
    // return json.results || error
  } catch (e) {
    console.log(e)
    return { error: e }
  }
}
