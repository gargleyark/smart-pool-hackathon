var query = require('../../bin/database.js')

module.exports = putInOffice = async (context) => {
  const othersInOffice = await query(`SELECT * from in_the_office;`)

  if (othersInOffice.rows.length > 0) {
    return {
      matchedUser: othersInOffice.rows[0].slack_id,
    }
  }

  result = await query(
    `INSERT INTO in_the_office(slack_id) VALUES (${context.userId});`
  )
  return { message: 'You are in the office and ready to play! G🎱🎱d luck!' }
}
