/**
 * Author: desenHome
 * Date: 13-4-16
 * Time: 下午5:06
 * Desc:
 */
var account = exports = module.exports = {};
var mongo = require('../utils/mongo'),
    crypto = require('crypto'),
    accounts = global.db.collection('accounts'),
    moment = require('moment'),
    email = require('../utils/email');
/* login validation methods */

account.addUser = function (newData, socket) {
    var result = {
        mark: 'addUser',
        success: false
    };
    accounts.findOne({user: newData.user}, function (e, o) {
        if (o) {
            result.err = {
                code: '1-1',
                info: 'user-taken'
            };
            socket.emit('callback', result);
        } else {
            accounts.findOne({email: newData.email}, function (e, o) {
                if (o) {
                    result.err = {
                        code: '1-2',
                        info: 'email-taken'
                    };
                    socket.emit('callback', result);
                } else {
                    saltAndHash(newData.pass, function (token,hash) {
                        newData.token = token;
                        newData.pass = hash;
                        // append date stamp when record was created //
                        newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                        accounts.insert(newData, {safe: true}, function (err) {
                            if (!err) {
                                result.success = true;
                                socket.emit('callback', result);
                            }
                            else {
                                result.err = err;
                                socket.emit('callback', result);
                            }
                        });
                    });
                }
            });
        }
    });
};
account.login = function (user, socket) {
    var result = {
        mark: 'login',
        success: false
    };
    accounts.findOne({user: user.user}, function (e, o) {
        if (o == null) {
            result.err = {
                code: '2-1',
                info: 'user-not-found'
            };
            socket.emit('callback', result);
        } else {
            validatePassword(user.pass, o.pass, function (err, res) {
                if (res) {
                    if (user.rememberMe) {
                        result.token = o.token;
                        result.user = o.user;
                    }
                    result.success = true;
                    socket.handshake.group = o.group;
                    socket.emit('callback', result);
                } else {
                    result.err = {
                        code: '2-2',
                        info: 'invalid-password'
                    };
                    socket.emit('callback', result);
                }
            });
        }
    });
};
account.autoLogin = function (user, socket) {
    var result = {
        mark: 'autoLogin',
        success: false
    };
    accounts.findOne({user: user.user}, function (e, o) {
        if (e) {
            result.err = {
                code: '2-2',
                info: e
            };
            socket.emit('callback', result);
        }
        else if (o.token === user.token) {
            socket.handshake.group = o.group;
            result.success = true;
            socket.emit('callback', result);
        }
    });
};

account.passwordReset = function(userEmail,socket){
    var result = {
        mark: 'passwordReset',
        success: false
    };
    accounts.findOne({email: userEmail}, function (e, o) {
        if (e) {
            result.err = {
                code: '2-2',
                info: e
            };
            socket.emit('callback', result);
        }
        else if (o) {
            var salt = generateSalt();
            o.resetToken = sha256(salt);
            o.resetDate = moment().format('X');

            accounts.save(o, {safe: true}, function(err,item){
                if(!err){
                   email.passwordReset(o,function(err,message){
                        if(!err){
                            result.success = true;
                            socket.emit('callback', result);
                            console.log(message);
                        }
                       else{
                            console.log(message);
                            socket.emit('callback', result);
                        }
                   });
                }
                else{
                    console.log(err);
                }
            });
        }
    });
};


/* record insertion, update & deletion methods */

account.updateUser = function (newData, callback) {
    accounts.findOne({user: newData.user}, function (e, o) {
        o.name = newData.name;
        o.email = newData.email;
        o.country = newData.country;
        if (newData.pass == '') {
            accounts.save(o, {safe: true}, callback);
        } else {
            saltAndHash(newData.pass, function (token,hash) {
                o.token = token;
                o.pass = hash;
                accounts.save(o, {safe: true}, callback);
            });
        }
    });
};

account.updatePassword = function (email, newPass, callback) {
    accounts.findOne({email: email}, function (e, o) {
        if (e) {
            callback(e, null);
        } else {
            saltAndHash(newPass, function (token,hash) {
                o.token = token;
                o.pass = hash;
                o.resetToken = '';
                accounts.save(o, {safe: true}, callback);
            });
        }
    });
}

/* account lookup methods */

account.deleteAccount = function (id, callback) {
    accounts.remove({_id: getObjectId(id)}, callback);
}

account.getAccountByEmail = function (email, callback) {
    accounts.findOne({email: email}, function (e, o) {
        callback(o);
    });
}

account.validateReset = function (data,socket) {
    var result = {
        mark: 'validateReset',
        success: false
    };
    accounts.findOne({email: data.email}, function (e, o) {
        if(!e){
           var dataNow = o.resetDate = moment().format('X');
            if(dataNow- o.resetDate >=3600){
               result.err = {
                   code:'5',
                   info:'token out date'
               }
                socket.emit('callback', result);
            }
            else if(o.resetToken === data.token){
                account.updatePassword(data.email,data.newpass,function(err,res){
                      if(!err&&res){
                          result.success = true;
                          socket.emit('callback', result);
                      }
                });
            }
            else{
                result.err = {
                    code:'5',
                    info:'token wrong'
                }
                socket.emit('callback', result);
            }
        }
    });
}

var generateSalt = function () {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function (str) {
    return crypto.createHash('md5').update(str).digest('hex');
}
var sha256 = function(salt){
    return crypto.createHash('sha256',global.tokenSecurt).update(salt).digest('hex');
};

var saltAndHash = function (pass, callback) {
    var salt = generateSalt();
//    callback(salt + md5(pass + salt));
    var hashpass =  md5(pass + global.tokenSecurt);
    callback(salt+sha256(salt+hashpass),hashpass);
};

var validatePassword = function (plainPass, hashedPass, callback) {
    var validHash =  md5(plainPass + global.tokenSecurt);
    callback(null, hashedPass === validHash);
};

/* auxiliary methods */

var getObjectId = function (id) {
    return accounts.db.bson_serializer.ObjectID.createFromHexString(id)
}

var findById = function (id, callback) {
    accounts.findOne({_id: getObjectId(id)},
        function (e, res) {
            if (e) callback(e)
            else callback(null, res)
        });
};


var findByMultipleFields = function (a, callback) {
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
    accounts.find({ $or: a }).toArray(
        function (e, results) {
            if (e) callback(e)
            else callback(null, results)
        });
}







