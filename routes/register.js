const express = require('express');
const router = express.Router();
const dbConfig = require('../util/dbconfig');

router.post('/register', (req, res) => {
  const name = req.body.userName;
  const pwd = req.body.userPwd;
  const email = req.body.email;
  const phone = req.body.phone;
  //! 写查询语句
  new Promise((resolve, reject) => {
    //! 以下sql语句
    const sql = `select * from user_msg where user_name = '${name}'`;
    const sqlArr = [];
    const callback = (err, data) => {
      if (data.length <= 0) {
        //! 因为找不到东西返回来的是空数组 如果数组长度等于0表示没找到
        //! 交给resolve解决
        resolve();
      }
      else {
        reject('用户已经存在');
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback)
  }).then(data => {
    //!没找到来到这个函数表示可以注册了 写注册的sql语句
    const sql = `insert into user_msg(user_name,user_pwd,user_email,user_phone) value ('${name}','${pwd}','${email}','${phone}')`;
    const sqlArr = [];
    const callback = (err, data) => {
      if (err) throw err;
      res.send({
        status_code: 200,
        sqlMsg: '注册成功,正在为您跳转登录页面'
      })
      console.log(data);
    }
    dbConfig.sqlConnect(sql, sqlArr, callback)
  }).catch(data => {
    res.send({
      status_code: 422,
      sqlMsg: '用户名已存在'
    })
  })
})

module.exports = router;