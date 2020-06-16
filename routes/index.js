var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET china and world data. */
router.get('/cdata', function (req, res, next) {
  fs.readFile('./data/area-data.json', (err, data) => {
    res.send(data);
  })
});

router.get('/wdata', function (req, res, next) {
  fs.readFile('./data/world-data.json', (err, data) => {
    res.send(data);
  })
})

module.exports = router;
