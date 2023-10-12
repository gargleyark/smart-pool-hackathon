// const { App, ExpressReceiver } = require('@slack/bolt')
// const express = require('express')
const path = require('path')
// const cookieParser = require('cookie-parser')
// const logger = require('morgan')
require('dotenv').config()
const getPoolTableBooked = require('./routes/pool-table-booked/get')
const postPoolTableBooked = require('./routes/pool-table-booked/post')

const deleteScore = require('./routes/scoreboard/delete')
const getScoreboard = require('./routes/scoreboard/get')
const postScore = require('./routes/scoreboard/post')

const putInOffice = require('./routes/in-office/put')

const getSummary = require('./routes/summary/get')

const express = require('express')
const { App, ExpressReceiver } = require('@slack/bolt')
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})
receiver.router.use(express.static(path.join(__dirname, '../client/build')))
receiver.router.get('/api/pool-table-booked', getPoolTableBooked)
receiver.router.post('/api/pool-table-booked', postPoolTableBooked)
receiver.router.get('/api/summary', getSummary)

const app = new App({ token: process.env.SLACK_BOT_TOKEN, receiver })

app.message(/^game.*/i, async ({ context, say }) => {
  const newLeaderboard = await postScore(context)
  await say(newLeaderboard)
})

app.message(/^delete last game$/i, async ({ context, say }) => {
  const newLeaderboard = await deleteScore(context)
  await say(newLeaderboard)
})

app.message(/^leaderboard$/i, async ({ context, say }) => {
  const leaderboard = await getScoreboard(context)
  await say(leaderboard)
})

app.message(/^in office$/i, async ({ context, say }) => {
  const inOffice = await putInOffice(context)

  if (inOffice.matchedUser) {
    // await app.client.chat.postMessage({
    //   token: process.env.SLACK_BOT_TOKEN,
    //   channel: inOffice.matchedUser,
    //   text: `Hey you have been matched for a game of pool with <@${context.userId}>!`,
    // });
    // await app.client.chat.postMessage({
    //   token: process.env.SLACK_BOT_TOKEN,
    //   channel: context.userId,
    //   text: `Hey you have been matched for a game of pool with <@${inOffice.matchedUser}>!`,
    // });
    say('you have been matched!')
  } else {
    await say(inOffice.message)
  }
})

module.exports = app
