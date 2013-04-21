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
End.init = function(config,server){
    this.config = config;
    global.tokenSecurt = config.tokenSecurt;
    global.email_config = config.email_config;
    if(!server){
        this.io = sio.listen(config.sio_config.port,config.sio_config.options);
    }
    else{
        this.io = sio.listen(server);
    }
    this.connect(this);
    this.on();
    return this.io;

};
End.connect = function(that){
    global.BSON = mongo.BSONPure;
    mongo.Db.connect(that.config.mongo_config.mongoURI,that.config.mongo_config.options ,function(err, db) {
        if(!err){
            console.log('connect to mongoDB !')
            global.db = db;
            account = require('./base/account');
            dal = require('./base/dal');
            listen = require('./base/listen');
        }
        else{
            console.log(err);
        }
    });
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
