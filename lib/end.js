/**
 * author: mdemo
 * Date: 13-1-20
 * Time: 下午3:47
 * Desc:
 */
var routers = require('./routers'),
    mongo = require('mongodb'),
    server = require('http').createServer(),
    sio = require('socket.io');

var End = module.exports = {};
End.init = function(ops){
    this.host = ops.host||"localhost";
    this.port = ops.port||27017;
    this.app = ops.app;
    this.username = ops.username||"";
    this.password = ops.password||"";
    this.onPort = ops.onPort||1991;
    this.io = sio.listen(80);
    this.connect(this);
    this.on();

};
End.connect = function(that){
    var mongo_server = new mongo.Server(that.host, that.port, {auto_reconnect: true});
    global.db = new mongo.Db(that.app, mongo_server, {safe: true});
    global.BSON = mongo.BSONPure;
    global.db.open(function(err, db) {
        if(!err) {
            console.log("Connected to "+that.app);
        }
    });
};
End.on = function(){
    this.io.sockets.on('connection', function (socket) {
        //TODO:这里可以对于新链接加入,进行统一处理。另外调用路由
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
    this.io.sockets.on('data',function(data){
        routers.data();
    });
    this.io.sockets.on('addons',function(data){

    });
    this.io.sockets.on('on',function(data){

    });
    this.io.sockets.on('error',function(){
        console.log('error');
    });
};
