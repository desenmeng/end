/**
 * User: mdemo
 * Date: 12-12-12
 * Time: 下午6:13
 */
exports.log = function(error){
    console.log(error);
};
exports.res = function(res,error_code,error){
    res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8'});
    res.write('{error_code:'+error_code+',error:'+error+'}');
    res.end();
};

