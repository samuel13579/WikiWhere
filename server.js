require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");


// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
  })

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})