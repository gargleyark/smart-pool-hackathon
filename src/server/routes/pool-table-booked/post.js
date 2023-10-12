module.exports = postPoolTableBooked = (req, res, next) => {
  console.log('post "pool-table-booked" route hit')
  res.send({ booked: false, timeLeft: 10 })
}
