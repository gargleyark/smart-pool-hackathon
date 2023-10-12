const nodeFetch = require('node-fetch')
require('dotenv').config()
var query = require('../../bin/database.js')

module.exports = getScoreboard = async () => {
  try {
    const result = await query(`SELECT * from users ORDER BY weighting DESC;`)

    if (result.rows.length === 0) {
      ;('The scoreboard is empty!')
    }

    return result.rows
      .map(({ name, weighting }) => `${name}: ${weighting}`)
      .join('\n')
  } catch (e) {
    console.log(e)
    return 'Sorry, something went wrong'
  }
}
