require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, UPDATE, DELETE");
  next();
});

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
  })

app.use("/api", user);


// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})