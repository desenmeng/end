/**
 * author: mdemo
 * Date: 13-1-4
 * Time: 下午5:16
 * Desc: end.js
 */
var http = require('http'),
    mongo = require('mongodb'),
    io = require('socket.io'),
    server = http.createServer(),
    conf = {};

exports=module.exports=init;
function init(opts){
    conf.host = opts.host||"localhost";
    conf.port = opts.port||27017;
    conf.app = opts.app;
    conf.username = opts.username||"";
    conf.password = opts.password||"";
    conf.listenPort = opts.listenPort||1991;
    connect();
    listen();
}
function connect(){
    var mongo_server = new mongo.Server(conf.host, conf.port, {auto_reconnect: true});
    global.db = new mongo.Db(conf.app, mongo_server, {safe: true});
    global.BSON = mongo.BSONPure;
    global.db.open(function(err, db) {
        if(!err) {
            console.log("Connected to "+conf.app);
        }
    });
}
function listen(){
    io.listen(conf.listenPort);
    io.sockets.on('connection', function (socket) {
        socket.on('set nickname', function (name) {
            socket.set('nickname', name, function () {
                socket.emit('ready');
            });
        });

        socket.on('msg', function () {
            socket.get('nickname', function (err, name) {
                console.log('Chat message by ', name);
            });
        });
    });
}


