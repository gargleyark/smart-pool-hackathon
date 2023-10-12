const trueskill = require('trueskill')
module.exports = getSummary = async (req, res, next) => {
  const alice = {
    skill: [25.0, 25.0 / 3.0],
    rank: 1,
  }

  const bob = {
    skill: [25.0, 25.0 / 3.0],
    rank: 2,
  }

  trueskill.AdjustPlayers([alice, bob])

  res.send({ alice, bob })
}
