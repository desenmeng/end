/**
 * User: mdemo
 * Date: 12-12-6
 * Time: 下午6:26
 */
exports=module.exports=rest;
var wind = require("wind");
var mongo = require('../utils/mongo');
var send = require('../utils/send');
function rest(req,res){
    var urls = parse(req.url);
    if(urls){
        execte(urls,req.method);
    }
    mongo.collections(function(err,collections){
        if(!err){
            send(res,collections);
        }
        else{
            send.error(res,1,err);
        }
    });
}

function parse(url){
    var urls = url.slice(1).split('/');
    if(urls.length>0){
      return urls;
    }
    else{
        return null;
    }
}
function execte(method,urls){
    console.log(urls);
}

//解析url和路由
//参数格式审核
//函数调用



