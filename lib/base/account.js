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
    moment = require('moment');
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
                    saltAndHash(newData.pass, function (hash) {
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
                        result.token = o.pass;
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
        else if (o.pass === user.pass) {
            socket.handshake.group = o.group;
            result.success = true;
            socket.emit('callback', result);
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
            saltAndHash(newData.pass, function (hash) {
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
            saltAndHash(newPass, function (hash) {
                o.pass = hash;
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

account.validateResetLink = function (email, passHash, callback) {
    accounts.find({ $and: [
        {email: email, pass: passHash}
    ] }, function (e, o) {
        callback(o ? 'ok' : null);
    });
}

account.getAllRecords = function (callback) {
    accounts.find().toArray(
        function (e, res) {
            if (e) callback(e)
            else callback(null, res)
        });
};

account.delAllRecords = function (callback) {
    accounts.remove({}, callback); // reset accounts collection for testing //
}

/* private encryption & validation methods */

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

var saltAndHash = function (pass, callback) {
    var salt = generateSalt();
    callback(salt + md5(pass + salt));
}

var validatePassword = function (plainPass, hashedPass, callback) {
    var salt = hashedPass.substr(0, 10);
    console.log(salt);
    var validHash = salt + md5(plainPass + salt);
    console.log(validHash);
    callback(null, hashedPass === validHash);
}

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







