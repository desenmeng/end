/**
 * author: mdemo
 * Date: 13-1-20
 * Time: 下午3:47
 * Desc:
 */
var http = require('http'),
    route = require('./route'),
    mongodb = require('mongodb'),
    server = http.createServer();
var End = module.exports = {};
End.init = function(ops){
    this.host = ops.host||"localhost";
    this.port = ops.port||27017;
    this.app = ops.app;
    this.username = ops.username||"";
    this.password = ops.password||"";
    this.listenPort = ops.listenPort||1991;
    this.connect(this);

};
End.connect = function(that){
    var mongo_server = new mongo.Serverthat(that.host, that.port, {auto_reconnect: true});
    global.db = new mongo.Db(that.app, mongo_server, {safe: true});
    global.BSON = mongo.BSONPure;
    global.db.open(function(err, db) {
        if(!err) {
            console.log("Connected to "+that.app);
        }
    });
};
End.on = function(){

};
