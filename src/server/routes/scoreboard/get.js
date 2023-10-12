require('dotenv').config()
var query = require('../../bin/database.js')

module.exports = getScoreboard = async () => {
  try {
    const result = await query(`SELECT * from users;`)

    if (result.rows.length === 0) {
      return 'The scoreboard is empty!'
    }

    const scoreboard = result.rows
      .map(({ name, weighting }) => ({
        name,
        weighting: JSON.parse(weighting)[0],
      }))
      .sort((a, b) => b.weighting - a.weighting)

    return scoreboard
      .map(
        ({ name, weighting }, index) => `${index + 1}. ${name} - ${weighting}`
      )
      .join('\n')
  } catch (e) {
    console.log(e)
    return 'Sorry, something went wrong'
  }
}
