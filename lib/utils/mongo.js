/**
 * author: mdemo
 * Date: 13-1-20
 * Time: 下午3:59
 * Desc: handle mongo for dal
 */
var mongo = exports = module.exports = {};
var auth = require('./auth');
mongo.collections = function (callback) {
    global.db.collectionNames(function (err, names) {
        callback(err, names);
    });
};
mongo.findOne = function (name, id, options, callback) {
    auth.hasAuth(global.sio.handshake.group, name, 'read', function (result) {
        if (result.success) {
            global.db.collection(name).findOne(id, options, function (err, item) {
                if (err) {
                    callback(false);
                }
                else {
                    callback(item);
                }
            });
        }
        else {
            callback(false);
        }
    });
};
mongo.find = function ( name, query, options, callback) {
    auth.hasAuth(global.sio.handshake.group, name, 'read', function (result) {
        if (result.success) {
            global.db.collection(name).find(query, options).toArray(function (err, items) {
                if (err) {
                    callback(false);
                }
                else {
                    callback(items);
                }
            });
        }
        else {
            callback(false);
        }
    });
};
mongo.insert = function (data, name, docs, options, callback) {
    auth.hasAuth(global.sio.handshake.group, name, 'create', function (result) {
        if (result.success) {
            global.db.collection(name).insert(docs, options, function (err, result) {
                if (err) {
                    callback(false)
                }
                else {
                    callback(result[0]._id);
                    if (data.route) {
                        data.route = name;
                        data.mark = data.route + '.child_added';
                        global.sios.in(data.mark).emit('callback', data);
                    }
                }
            });
        }
        else {
            callback(result);
        }
    });
};
mongo.remove = function (data, name,selector, callback) {
    auth.hasAuth(global.sio.handshake.group, name, 'remove', function (result) {
        if (result.success) {
            global.db.collection(name).remove(selector, {}, function (err) {
                if (err) {
                    callback(false);
                }
                else {
                    callback(true);
                    data.mark = data.route + '.child_removed';
                    global.sios.in(data.mark).emit('callback', data);
                }
            });
        }
        else {
            callback(result);
        }
    });
};
mongo.update = function (data, name, selector, doc, options, callback) {
    auth.hasAuth(global.sio.handshake.group, name, 'update', function (result) {
        if (result.success) {
            global.db.collection(name).update(selector, doc, options, function (err, numerUpdated) {
                if (err) {
                    callback(false);
                }
                else {
                    callback(true);
                    switch (data.type) {
                        case 'update':
                            mongo.findOne(name, selector, {}, function (item) {
                                item.mark = data.route + '.child_changed';
                                item.route = data.route;
                                global.sios.in(item.mark).emit('callback', item);
                            });
                            break;
                        case 'set':
                            data.mark = data.route + '.child_changed';
                            global.sios.in(data.mark).emit('callback', data);
                            break;
                        case 'push':
                            data.mark = data.route + '.child_added';
                            global.sios.in(data.mark).emit('callback', data);
                            break;
                    }
                }
            });
        }
        else {
            callback(result);
        }
    });
};