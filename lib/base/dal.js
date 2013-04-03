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
        var collection = data.routes[0];
        mongo.insert(data,collection,data.value, {safe:true},callback);
    }
};
dal.update = function(data,callback){
    if(2===data.routes.length){
        var collection = data.routes[0],
            id = data.routes[1];
        if(!data.options){
            data.options = {safe:true};
        }
        data.type = 'update';
        mongo.update(data,collection,{'_id':new BSON.ObjectID(id)},{'$set':data.value}, data.options,callback);
    }
};
dal.set = function(data,callback){
    if(3===data.routes.length){
        var collection = data.routes[0],
            id = data.routes[1],
            value = {};
        value[data.routes[2]] = data.value;
        data.type = 'set';
        mongo.update(data,collection,{'_id':new BSON.ObjectID(id)},{'$set':value}, {safe:true},callback);
    }
};
dal.push = function(data,callback){
    if(3===data.routes.length){
        var collection = data.routes[0],
            id = data.routes[1],
            value = {};
        value[data.routes[2]] = data.value;
        data.type = 'push';
        mongo.update(data,collection,{'_id':new BSON.ObjectID(id)},{'$push':value}, {safe:true},callback);
    }
};
dal.page = function(data,callback){

};
dal.findAll = function(data,callback){
    if(1===data.routes){
        var collection = data.routes[0];
        mongo.findAll(collection,callback)
    }
};
dal.findById = function(data, callback) {
    if(2===data.routes.length){
        var collection = data.routes[0],
            id = data.routes[1];
        mongo.findOne(collection,{'_id':new BSON.ObjectID(id)},callback);
    }
};
