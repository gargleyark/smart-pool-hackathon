var query = require('../../bin/database.js')

module.exports = putInOffice = async (context) => {
  const othersInOffice = await query(`SELECT * from in_the_office;`)

  if (othersInOffice.rows.length > 0) {
    return {
      matchedUser: othersInOffice.rows[0].slack_id,
    }
  } else {
    result = await query(
      `INSERT INTO in_the_office(slack_id, in_the_office) VALUES ('${
        context.userId
      }', to_timestamp((${Date.now()}) / 1000.0));`
    )
  }

  return { message: 'You are in the office and ready to play! G🎱🎱d luck!' }
}
