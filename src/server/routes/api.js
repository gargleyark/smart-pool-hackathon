const getPoolTableBooked = require('./pool-table-booked/get')
const postPoolTableBooked = require('./pool-table-booked/post')

const deleteScore = require('./pool-table-booked/get')
const getScoreboard = require('./pool-table-booked/post')
const postScore = require('./pool-table-booked/post')

const putInOffice = require('./in-office/put')

const getSummary = require('./summary/get')

const express = require('express')
const router = express.Router()

router.get('/pool-table-booked', getPoolTableBooked)
router.put('/pool-table-booked', postPoolTableBooked)

router.get('/scoreboard', getScoreboard)
router.post('/scoreboard', postScore)
router.delete('/scoreboard', deleteScore)

router.get('/in-office', putInOffice)

router.get('/summary', getSummary)

module.exports = router
