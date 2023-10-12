const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/users', function (req, res, next) {
  console.log('get "users" route hit')
  res.send({ users: ['joe', 'bernie', 'tulsi', 'donald', 'bill'] })
})

router.get('/pool-table-booked', function (req, res, next) {
  console.log('get "pool-table-booked" route hit')
  res.send({ booked: false, timeLeft: 10 })
})

module.exports = router
