// expressモジュールの読み込み
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// ドキュメントルートディレクトリをオブジェクトで定義する
var index = require('./routes/index');

// 変数appにexpress()を代入するとappがオブジェクト化する
var app = express();

// テンプレートエンジン"jade"の利用
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// モジュールの使用
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.jsが読み込まれた後にアクセスするファイル
app.use('/', index);

// エラー処理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// エラーの表示
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ブラウザ上で表示が成功したことについてコマンドプロンプト上でメッセージを表示する
app.listen(3000);
console.log("server starting...");

module.exports = app;
