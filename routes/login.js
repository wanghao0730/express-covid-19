const express = require('express');
const router = express.Router();
const dbConfig = require('../util/dbconfig');

router.post('/login', (req, res) => {

  const sql = `select * from user_msg where user_name = '${req.body.userName}' and user_pwd = '${req.body.userPwd}'`;
  const sqlArr = [];
  const callback = (err, data) => {
    if (err) {
      return res.send('当前用户未注册');
    }
    if (!data[0].user_name) {
      return console.log('不存在');
    }
    console.log('存在');
  };
  dbConfig.sqlConnect(sql, sqlArr, callback)
});

// router.post('/register')

module.exports = router;