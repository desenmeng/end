/**
 * author: mdemo
 * Date: 13-1-4
 * Time: 下午5:16
 * Desc: mongoDB操作
 */
var mongo = exports = module.exports = {};
/**
 * 获取所有集合名称
 */
mongo.collections = function (callback) {
    global.db.collectionNames(function (err, names) {
        if(err){
            //TODO:错误处理  这样不要调用都需要考虑错误问题。也方便错误控制，例如发送不同errno
        }
        else{
            callback(names);
        }
    });
};
