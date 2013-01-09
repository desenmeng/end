/**
 * User: mdemo
 * Date: 12-12-4
 * Time: 下午3:10
 */
var express = require('express');
var end = require('./end');
var path = require('path');
var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(path.join(__dirname, 'client')));
});
//配置参数方便数据库的其他帮顶。
end({
    host:"localhost",
    port:27017,
    username:"",
    password:"",
    app:"nodend"
});
app.listen(app.get('port'));

