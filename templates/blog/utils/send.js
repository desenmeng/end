/**
 * User: mdemo
 * Date: 12-12-22
 * Time: 下午4:11
 */
exports=module.exports=send;
function send(res,data){
    res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8'});
    res.end(JSON.stringify(data));
}
exports.error = function(res,error_code,error){
    res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8'});
    res.end('{error_code:'+error_code+',error:'+JSON.stringify(error)+'}');
};
exports.log = function(logs){
    for(var lo in logs){
        console.log(lo);
    }
};
