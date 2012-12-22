/**
 * User: mdemo
 * Date: 12-12-6
 * Time: 上午10:19
 */
var url = require('url');
var querystring = require('querystring');
var controller = require('./controller');
exports=module.exports=route;
function route(req,res){
   var api = apiRoute(req.url);
   controller(api,req,res);
}
function apiRoute(requrl){
    var u = url.parse(requrl);
    var api = querystring.parse(u.query).api;
    if(!api){
       api = "rest";
    }
    return api;
}
