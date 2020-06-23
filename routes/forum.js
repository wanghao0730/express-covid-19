const express = require('express');
const router = express.Router();
const dbConfig = require('../util/dbconfig');

router.get('/', (req, res) => {
  new Promise((resolve, reject) => {
    const sql = `select * from forum`;
    const sqlArr = [];
    const callback = (err, data) => {
      resolve(data);
      reject(err);
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
  }).then(data => {
    res.send({
      status_code: 200,
      data: data
    })
  }).catch(err => {
    if (err) {
      throw err;
    }
  })
})

module.exports = router;