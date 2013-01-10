/**
 * author: mdemo
 * Date: 13-1-5
 * Time: 下午4:49
 * Desc: 初始化end.js应用
 */

/**
 * Module dependencies.
 */

var http = require('http'),
    mongo = require('mongodb'),
    io = require('socket.io');

/**
 * Application prototype.
 */

var app = exports = module.exports = {};

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *
 * @api private
 */

app.init = function(opts){
    this.host = opts.host||"localhost";
    this.port = opts.port||27017;
    this.app = opts.app;
    this.username = opts.username||"";
    this.password = opts.password||"";
    this.listenPort = opts.listenPort||1991;
    this.connect();
};

app.connect =function(){
    var mongo_server = new mongo.Server(this.host, this.port, {auto_reconnect: true});
    global.db = new mongo.Db(this.app, mongo_server, {safe: true});
    global.BSON = mongo.BSONPure;
    global.db.open(function(err, db) {
        if(!err) {
            console.log("Success to connect");//TODO:使用log.success代替
        }
    });
};

app.listen = function(){
    console.log("socket.io is ready");
};
