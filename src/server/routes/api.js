const getPoolTableBooked = require('./pool-table-booked/get')
const postPoolTableBooked = require('./pool-table-booked/post')

const express = require('express')
const router = express.Router()

router.get('/pool-table-booked', getPoolTableBooked)
router.post('/pool-table-booked', postPoolTableBooked)

module.exports = router
