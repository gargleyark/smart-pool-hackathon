import React, { useState, useEffect } from 'react'
import logo from './react-logo.svg'
import nodejsLogo from './nodejs-logo.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [bookedStatus, setBookedStatus] = useState(null)

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.users))
    // Specify how to clean up after this effect:
    console.log(users)

    fetch('/api/pool-table-booked')
      .then((res) => res.json())
      .then((json) => setBookedStatus(json))
  }, []) // empty 2nd arg - only runs once

  return (
    <div className="App">
      <header className="App-header">
        {bookedStatus?.booked === true && (
          <h1>
            Sorry, table was already booked - try again in{' '}
            {bookedStatus.timeLeft} minutes!
          </h1>
        )}
        {bookedStatus?.booked === false && <h1>Pool table booked, enjoy!</h1>}
        {!bookedStatus && <h1>Checking if pool table is booked...</h1>}
      </header>
    </div>
  )
}

export default App
