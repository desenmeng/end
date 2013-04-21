/**
 * author: mdemo
 * Date: 13-1-25
 * Time: 下午3:59
 * Desc:
 */
var End = require('./../lib/end');
var app = require('express')()
    , server = require('http').createServer(app);


//mongodb设置
var mongo_config = {
    database: "nodend",
    host:"localhost",
    port:27017,
    options:{
        auto_reconnect: true
    }
};
//socket.io设置
var sio_config = {
    port: 8080,
    options:{
        'log level':1
    }
};
server.listen(80);
var sio = End.init(mongo_config,server);
sio.set('log level', 1);
