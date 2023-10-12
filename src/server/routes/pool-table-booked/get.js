module.exports = getPoolTableBooked = (req, res, next) => {
  console.log('get "pool-table-booked" route hit')
  res.send({ booked: true, timeLeft: 10 })
}
