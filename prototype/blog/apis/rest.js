/**
 * User: mdemo
 * Date: 12-12-6
 * Time: 下午6:26
 */
exports=module.exports=rest;
var mongo = require('../utils/mongo');
function rest(req,res){
    var urls = parse(req.url);
    if(urls){
        execte(urls,req.method);
    }
    var names =mongo.collections();
    console.log('rest....');
    console.log(names);
    var str =   JSON.stringify(names);
    res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8','Access-Control-Allow-Origin': '*'});
    res.end(str);
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



