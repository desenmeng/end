/**
 * author: mdemo
 * Date: 13-1-4
 * Time: 下午5:16
 * Desc: end.js
 */
var app = require('./application');

exports=module.exports=init;

exports.version = '0.0.1';

function init(opts){
   app.init(opts);
}


