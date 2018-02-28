// expressモジュールの読み込み
var express = require('express');
// 変数appにexpress()を代入するとappがオブジェクト化する
var app = express();

// resオブジェクトを使って、"Hello World!"を表示する
app.get('/', function (req, res) {
  res.send('Hello World from Braintree!');
});

// ブラウザ上で表示が成功したことについてコマンドプロンプト上でメッセージを表示する
app.listen(3000);
console.log("server starting...");
