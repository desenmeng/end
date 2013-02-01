/**
 * author: mdemo
 * Date: 13-1-20
 * Time: 下午3:57
 * Desc: End.js REST 业务逻辑
 */
var dal = exports = module.exports = {};
var mongo = require('../utils/mongo');
dal.insert = function(data,callback){
    if(1==data.routes.length){
        mongo.insert(data.routes[0],data.value, {safe:true},callback);
    }
};
dal.update = function(data,callback){
    if(2==data.routes.length){
        var collection = data.routes[0],
            id = data.routes[1];
        mongo.update(collection,{'_id':new BSON.ObjectID(data.routes[1])},{'$set':data.value}, {safe:true},callback);
    }
};
dal.set = function(data,callback){
    if(3==data.routes.length){
        var collection = data.routes[0],
            id = data.routes[1],
            value = {};
        value[data.routes[2]] = data.value;
        mongo.update(collection,{'_id':new BSON.ObjectID(data.routes[1])},{'$set':value}, {safe:true},callback);
    }
};
dal.push = function(data,callback){
    if(3==data.routes.length){
        var collection = data.routes[0],
            id = data.routes[1],
            value = {};
        value[data.routes[2]] = data.value;
        mongo.update(collection,{'_id':new BSON.ObjectID(data.routes[1])},{'$push':value}, {safe:true},callback);
    }
};