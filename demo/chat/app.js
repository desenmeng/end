/**
 * author: mdemo
 * Date: 13-1-25
 * Time: 下午3:59
 * Desc:
 */
var End = require('./../../lib/end');
var mongo_config = {
    database: "nodend",
    host:"localhost",
    port:27017,
    options:{
        auto_reconnect: true
    }
};
var sio_config = {
    port: 8080,
    options:{
        'log level':1
    }
}
End.init(mongo_config,sio_config);
