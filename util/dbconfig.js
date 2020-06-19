const mysql = require('mysql');

//! 暴露出去 
module.exports = {
  //! 配置服务器的连接
  config: {
    host: 'localhost',
    user: 'root',
    password: 'wanghao31',
    database: 'covid_user'
  },
  //! 创建一个sql函数 用于接收外部的sql语句
  sqlConnect: function (sql, sqlArr, callback) {
    //! 利用连接池连接
    const pool = mysql.createPool(this.config);
    pool.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        return
      }
      //! 事件驱动回调
      conn.query(sql, sqlArr, callback);
      //! 释放链接
      conn.release();
    })
  }
}