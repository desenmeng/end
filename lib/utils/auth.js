/**
 * Author: mdemo
 * Date: 13-4-20
 * Time: 上午11:57
 * Desc:
 */
var auth = exports = module.exports = {};
    groups = global.db.collection('groups');
auth.hasAuth = function(group,collection,type,callback){
    var result = {
        success:false
    };
    if(collection ==='accounts'||collection ==='groups'){
        result.err={
            code:'4-1',
                info:'Permission denied'
        };
        callback(result);
    }
    else{
        groups.findOne({_id:group},function(err,res){
            if(err){
                result.err={
                    code:'4-x',
                    info:err
                };
                callback(result);
            }
            else if(res){
                if(res[collection]&&res[collection].hasOwnProperty(type)&&res[collection][type]){
                   result.success = true;
                }
                else if(res[collection]&&res[collection].hasOwnProperty(type)&&!res[collection][type]){
                    result.err = {
                        code:'4-1',
                        info:type+' Permission denied for '+collection
                    };
                }
                else{
                    result.success = true;
                }
                callback(result);
            }
            else{
                result.success = true;
                callback(result);
            }
        });
    }

};

