/**
 * author: mdemo
 * Date: 13-1-25
 * Time: 下午3:59
 * Desc:
 */
var End = require('./../lib/end'),
    end_config = require('./end_config.js').end_config,
    app = require('express')(),
    server = require('http').createServer(app);

server.listen(8080);
var sio = End.init(end_config, server);
sio.set('log level', 1);
