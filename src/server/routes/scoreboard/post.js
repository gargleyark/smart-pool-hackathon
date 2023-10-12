require('dotenv').config()
var query = require('../../bin/database.js')
const trueskill = require('trueskill')

module.exports = postScore = async ({ matches }) => {
  console.log('post "score" route hit')
  try {
    const result = await query(`SELECT * from users;`)
    const users = result.rows
    const match = matches[0] //game james mike 5 10

    console.log(matches)

    const scores = match.match(/\d+/g)
    const names = match.match(/[^(game)][a-zA-Z]+/g)

    const team1Score = Number.parseInt(scores[0])
    const team2Score = Number.parseInt(scores[1])

    const team1Ranking = team1Score > team2Score ? 1 : 0
    const team2Ranking = team2Score > team1Score ? 1 : 0

    const team1Names = names.length > 2 ? [names[0], names[1]] : [names[0]]
    const team2Names = names.length > 2 ? [names[2], names[3]] : [names[1]]

    const usersToUpdate = []
    const usersToCreate = []
    const warnings = []

    team1Names.forEach((name) => {
      console.log('updating', name.trim(), 'with', team1Score)
      const user = users.find((user) => user.name === name.trim())

      if (!user) {
        warnings.push(`Could not find user ${name}, creating a new user`)
        usersToCreate.push({
          name: name.trim(),
          skill: [25.0, 25.0 / 3.0],
          rank: team1Ranking,
        })
      } else {
        console.log(user.weighting)
        const userWeighting = user.weighting
        usersToUpdate.push({
          name: user.name,
          skill: userWeighting,
          rank: team1Ranking,
        })
      }
    })

    team2Names.forEach((name) => {
      console.log('updating', name.trim(), 'with', team2Score)
      const user = users.find((user) => user.name === name.trim())
      if (!user) {
        warnings.push(`Could not find user ${name}, creating a new user`)
        usersToCreate.push({
          name: name.trim(),
          skill: [25.0, 25.0 / 3.0],
          rank: team2Ranking,
        })
      } else {
        console.log(user.weighting)
        const userWeighting = user.weighting
        usersToUpdate.push({
          name: user.name,
          skill: userWeighting,
          rank: team2Ranking,
        })
      }
    })

    trueskill.AdjustPlayers(usersToUpdate)
    trueskill.AdjustPlayers(usersToCreate)

    usersToUpdate.forEach(({ name, skill }) => {
      const weighting = JSON.stringify(skill)
      query(
        `UPDATE users SET weighting = '${weighting}' WHERE name = '${name}';`
      )
    })

    usersToCreate.forEach(({ name, skill }) => {
      const weighting = JSON.stringify(skill)
      query(
        `INSERT INTO users (name, weighting, slack_id) VALUES ('${name}', '${weighting}', '${name}');`
      )
    })

    return `Updated Scoreboard.\n${warnings.join('\n')}`
  } catch (e) {
    console.log(e)
    return 'Sorry, something went wrong'
  }
}
