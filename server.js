const express = require('express');
const cowsay = require('cowsay');
const cors = require('cors');

// Create the server
const app = express();

app.get('/api/test', cors(), async(req, res, next) => {
    res.json({ message: "API Working" });
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});