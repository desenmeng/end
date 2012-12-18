/**
 * User: mdemo
 * Date: 12-12-5
 * Time: 下午2:38
 */
//define 参数
var http = require('http'),
    route = require('./route'),
    controller = require('./controller'),
    mongo = require('mongodb'),
    server = http.createServer(),
    configs = {};

exports=module.exports=init;
exports.use = controller.use;
function init(args){
    configs.host = args.host||"localhost";
    configs.port = args.port||27017;
    configs.app = args.app;
    configs.username = args.username||"";
    configs.password = args.password||"";
    configs.listenPort = args.listenPort||1991;
    mongoConect();
    onlisten();
}
function mongoConect(){
    var mongo_server = new mongo.Server(configs.host, configs.port, {auto_reconnect: true});
    global.db = new mongo.Db(configs.app, mongo_server, {safe: true});
    global.BSON = mongo.BSONPure;
    global.db.open(function(err, db) {
        if(!err) {
            console.log("Connected to "+configs.app);
        }
    });
}
function onlisten(){
    server.on("request",function(req,res){
        route(req,res);
    });
    server.listen(configs.listenPort);
}
