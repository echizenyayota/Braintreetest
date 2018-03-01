// expressモジュールの読み込み
var express = require('express');
var module-name = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 変数appにexpress()を代入するとappがオブジェクト化する
var app = express();

// resオブジェクトを使って、"Hello World!"を表示する
app.get('/', function (req, res) {
  res.send('Hello World from Braintree!');
});

// モジュールの使用
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ブラウザ上で表示が成功したことについてコマンドプロンプト上でメッセージを表示する
app.listen(3000);
console.log("server starting...");

module.exports = app;
