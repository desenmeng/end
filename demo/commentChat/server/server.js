/**
 * author: mdemo
 * Date: 13-1-9
 * Time: 下午4:48
 * Desc: 将评论变成实时聊天 server端
 */
var io = require('socket.io').listen(80);
io.sockets.on('connection', function (socket) {
    socket.join('test');
    io.sockets.in('test').emit('join',socket.id);
    console.log(io.sockets.clients('test').length);
});

