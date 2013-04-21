/**
 * author: mdemo
 * Date: 13-1-20
 * Time: 下午3:47
 * Desc:
 */
var mongo = require('mongodb'),
    sio = require('socket.io'),
    dal = {},
    listen = {},
    account = {};
;

var End = module.exports = {};
End.init = function(mongo_config,sio_config){
    this.mongo_config = mongo_config;
    this.sio_config = sio_config;
    if(sio_config.port){
        this.io = sio.listen(this.sio_config.port,this.sio_config.options);
    }
    else{
        this.io = sio.listen(sio_config);
    }
    this.io.set('authorization', function (handshakeData, callback) {
        callback(null, true); // error first callback style
    });
    this.connect(this);
    this.on();
    return this.io;

};
End.connect = function(that){
    var mongo_server = new mongo.Server(that.mongo_config.host,that.mongo_config.port,that.mongo_config.options);
    global.db = new mongo.Db(that.mongo_config.database, mongo_server, {safe: true});
    global.BSON = mongo.BSONPure;
    global.db.open(function(err, db) {
        if(!err) {
            console.log("Connected to "+that.mongo_config.database);
        }
    });
    account = require('./base/account');
    dal = require('./base/dal');
    listen = require('./base/listen');
};
End.on = function(){
    global.sios = this.io.sockets;
    this.io.sockets.on('connection', function (socket) {
        socket.handshake.group = 'normal';
        global.sio = socket;
        socket.on('dal',function(data,callback){
            dal[data.method](data,callback);
        });
        socket.on('onlisten',function(ontype,route){
            listen[ontype](route,true);
        });
        socket.on('account',function(type,user){
            account[type](user,socket);
        });
        socket.on('disconnect', function(){
            console.log("Connection " + socket.id + " terminated.");
        });
    });

};
