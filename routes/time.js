const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  fs.readFile('./data/time-service.json', (err, data) => {
    if (err) throw err;
    res.send(data)
  })
})

module.exports = router;