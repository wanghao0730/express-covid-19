const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  //! 收到前端要拿详细数据了 对数据进行过滤
  fs.readFile('./data/area-data.json', (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.toString());
  })
})

module.exports = router;