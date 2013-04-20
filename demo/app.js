/**
 * author: mdemo
 * Date: 13-1-25
 * Time: 下午3:59
 * Desc:
 */
var End = require('./../lib/end');
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
End.init(mongo_config,sio_config);
