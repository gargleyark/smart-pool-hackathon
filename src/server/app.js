const { App, ExpressReceiver } = require('@slack/bolt')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const apiRouter = require('./routes/api')

const app = express()

// const boltApp = new App({
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   token: process.env.SLACK_BOT_TOKEN,
//   endpoints: '/',
// })

// const boltReceiver = new ExpressReceiver({
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   endpoints: '/',
// })
// const boltApp = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   receiver: boltReceiver,
// })

// boltApp.event('member_joined_channel', ({ event }) => console.log(event))
// boltApp.event('message', ({ event, say }) => say('hello'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use('/slack/events', boltApp.receiver)

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
