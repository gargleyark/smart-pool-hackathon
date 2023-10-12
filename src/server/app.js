const { App } = require('@slack/bolt')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const apiRouter = require('./routes/api')

const app = express()

const boltApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  endpoints: '/',
})

boltApp.message('pool', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`)
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/slack/events', boltApp.receiver.router)

// mount our api router here
app.use('/api', apiRouter)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  console.log('req.path', req.path)
  res.sendFile(path.join(__dirname + '../client/build/index.html'))
})

module.exports = app
