/**
 * User: mdemo
 * Date: 12-12-6
 * Time: 下午6:24
 */
exports = module.exports = controller;
var rest = require('./apis/rest'),
    error = require('./utils/send');
global.apis = {};
global.apis['rest'] = rest;
function controller(name,req,res){
    var api = apis[name];
    if(api){
        api(req,res);
    }
    else{
       send.errro(res,1,'api-'+name+" not found");
    }
}
exports.use = function(name){
    var api = require('./apis/rest');
    if(api){
        global.apis[name] = api;
    }
    else{
       send.log('api:'+name+" not found");
    }
};
