const express = require('express');
const router = express.Router();
const dbConfig = require('../util/dbconfig');

router.post('/login', (req, res) => {
  const name = req.body.userName;
  const pwd = req.body.userPwd;
  const sql = `select * from user_msg where user_name = '${name}'`;
  const sqlArr = [];
  const callback = (err, data) => {
    if (err) {
      return res.send({
        error: 422,
        error_msg: '用户不存在'
      });
    }
    //! 没有查到数据的时候是返回的空数组 先判断数组中的长度吧 有长度就数据库返回的数据
    if (data.length <= 0) {
      //! 小于0代表没有
      res.send({
        code: 422,
        sqlMsg: '用户不存在'
      })
    } else if (data.length > 0 && data[0].user_pwd !== pwd) {
      //! 数组中有数据且 输入的密码与数据库对应查询的账户名一样
      res.send({
        code: 422,
        sqlMsg: '密码不正确'
      })
    } else {
      res.cookie(`userName`, `${data[0].user_name}`, { maxAge: 3600 * 60 * 24 }).send({
        code: 200,
        sql: '登录成功'
      })
    }
    // if (data && data[0].user_pwd === pwd) {
    //   res.send('登录成功');      
    // }

    // 判断用户的信息是否存在对于用户名和密码分别判断

  };
  dbConfig.sqlConnect(sql, sqlArr, callback)
});

// router.post('/register')

module.exports = router;