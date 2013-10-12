/**
 * author: mdemo
 * Date: 13-1-20
 * Time: 下午3:58
 * Desc: End.js 监听模块
 */
var listen = exports = module.exports = {};
var auth = require('../utils/auth');
listen.child_added = function (route, type) {
    auth.hasAuth(global.sio.handshake.group, route.split('.')[0], 'read', function (result) {
        if (result.success) {
            if (type) {
                global.sio.join(route + '.child_added');
            }
            else {
                global.sio.leave(route + '.child_added');
            }
        }

    });
};
listen.child_changed = function (route, type) {
    auth.hasAuth(global.sio.handshake.group, route.split('.')[0], 'read', function (result) {
        if (result.success) {
            if (type) {
                global.sio.join(route + '.child_changed');
                console.log('child_changed....');
            }
            else {
                global.sio.leave(route + '.child_changed');
            }
        }
    });
};
listen.child_removed = function (route, type) {
    auth.hasAuth(global.sio.handshake.group, route.split('.')[0], 'read', function (result) {
        if (result.success) {
            if (type) {
                global.sio.join(route + '.child_removed');
            }
            else {
                global.sio.leave(route + '.child_removed');
            }
        }
    });
};
