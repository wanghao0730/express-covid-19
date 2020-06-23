var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
//! 配置session
const session = require('express-session');
//! 引入路由
var indexRouter = require('./routes/index');
//! login路由
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register')
//! detail路由
const detail = require('./routes/detail');
//! 實時播報路由
const time = require('./routes/time');
//! 论坛数据
const forum = require('./routes/forum')

var app = express();
//!  view engine setup 配置视图相关
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//! 第三方中间件配置放在路由中间件之前配置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//! 配置body-parser解析post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//! 配置express-session中间件
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true
}))

//! 这个路由中间件配置
app.use('/api', indexRouter);
//! login路由
app.use('/api/user', loginRouter);
//!register路由
app.use('/api/sing', registerRouter)
//! detai路由
app.use('/api/detail', detail);
//! 實時路由
app.use('/api/time', time);
app.use('/api/forum', forum)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
