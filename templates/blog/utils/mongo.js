/**
 * User: mdemo
 * Date: 12-12-12
 * Time: 下午5:34
 */
var mongo = exports = module.exports = {};
/**
 * 获取所有集合名称
 */
mongo.collections = function (callback) {
    global.db.collectionNames(function (err, names) {
        callback(err,names);
    });
};
/**
 * 对集合的查询操作
 * @param name      集合名称
 * @param query     查询信息
 * @param options   筛选信息
 */
mongo.collection = function (name, query, options) {
    global.db.collection(name, function(err, collection) {
        collection.find(query,options).toArray(function(err, items) {
            if(err){
                console.log(err);
            }
            else{
                console.log(items);
            }
        });
    });
};

/**
 * 根据id查找文档
 * @param name  集合名
 * @param id    稳定id名
 */
mongo.findOne = function (name, id) {
    global.db.collection(name, function (err, collection) {
        collection.findOne({'_id':new global.BSON.ObjectID(id)}, function (err, item) {
            console.log(item);
        });
    });
};

/**
 * 插入文档
 * @param name 集合名
 * @param docs  文档内容，
 */
mongo.insert = function (name, docs) {
    global.db.collection(name, function (err, collection) {
        collection.insert(docs, {safe:true}, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("success");
            }
        });
    });
};

/**
 * 删除集合里面的内容
 * @param name 集合名称
 */
mongo.remove = function(name,selector,options){
    global.db.collection(name,function(err,collection){
        if(err){
            console.log(err);
        }
        else{
            collection.remove(selector,options,function(err,numerRemoved){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(numerRemoved);
                }
            });
        }
    });
};
/**
 * 集合的更新
 * @param name 集合名称
 * @param selector 文档筛选
 * @param doc      文档替换的内容
 * @param options  其他选项 //TODO:目前的options后期看看是否可以删除，简化操作。
 */
mongo.update = function(name,selector,doc,options){
    global.db.collection(name,function(err,collection){
        if(err){
            console.log(err);
        }
        else{
            collection.update(selector,doc,options,function(err,numerUpdated){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(numerUpdated);
                }
            });
        }
    });
};





