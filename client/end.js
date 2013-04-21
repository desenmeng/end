/**
 * author: mdemo
 * Date: 13-1-25
 * Time: 下午3:32
 * Desc: End.js javascript sdk
 */
(function (root) {

    var _vars = {
        socket:{},
        callbacks:[]
    };
    /**
     * 这里是End javascript sdk 的api文档
     * 在Node里面，你通过简单的初始化变可以使用End了
     *      // server
     *		var End = require('./../../lib/end');
     *		var mongo_config = {
     *		    database: "nodend",
     *		    host:"localhost",
     *		    port:27017,
     *		    options:{
     *		        auto_reconnect: true
     *		    }
     *		};
     *		var sio_config = {
     *		    port: 8080,
     *		    options:{
     *		        'log level':1
     *		    }
     *		};
     *		End.init(mongo_config,sio_config);
     *
     *      // client
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *
     * @class End
     * @constructor 初始化End，或构建一个End
     * @param {Object} route End路由
     * @param {String} url socket.io Url地址
     */
    var End = function (route, url) {
        this.route = route || '';
        if (url) {
            _vars.socket = io.connect(url);
            _vars.socket.on('callback',function(data){
                _vars.callbacks[data.mark](data);
            });
        }
    };
    var Account = {};
    root.End = End;
    root.Account = Account;
    Account.addUser = function(user,callback){
        _vars.socket.emit('account','addUser',user);
        _vars.callbacks['addUser'] = callback;
    };
    Account.login = function(user,callback){
        _vars.socket.emit('account','login',user);
        _vars.callbacks['login'] = callback;
    };
    Account.autoLogin = function(callback){
        var user = {
           user: $.cookie('user'),
           token: $.cookie('token')
        };
        if(user.user&&user.token){
            _vars.socket.emit('account','autoLogin',user);
            _vars.callbacks['autoLogin'] = callback;
        }
        else{
            var result = {
                err:{
                    code:'3-1',
                    info:'not find cookie'
                },
                success: false,
                mark:'autoLogin'
            };
            callback(result);
        }
    };
    Account.passwordReset = function(email,callback){
        _vars.socket.emit('account','passwordReset',email);
        _vars.callbacks['passwordReset'] = callback;
    };
    Account.validateReset = function(email,token,newpass,callback){
        _vars.socket.emit('account','validateReset',{email:email,token:token,newpass:newpass});
        _vars.callbacks['validateReset'] = callback;
    };
    /**
     * @method 新建下一级子元素
     *
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      var room = chatRooms.child('5155bd645ba882d606000001');
     *
     * @param {String} route 传入子元素路由
     * @returns {End}
     */
    End.prototype.child = function (route) {
        return new End(this.route + '.' + route);
    };
    /**
     * @method 获取上一级元素
     *
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      var room = chatRooms.child('5155bd645ba882d606000001');
     *      room.parent().route // route为chatRooms
     *
     * @returns {End}
     */
    End.prototype.parent = function () {
        var route = this.route.substring(0, this.route.lastIndexOf('.'));
        return new End(route);
    };
    End.prototype.data = function(value,method,callback,options){
        var data = {
            routes:this.route.split('.'),
            route: this.route,
            value:value||null,
            method:method,
            options:options||null
        };
        _vars.socket.emit('dal',data,function(returns){
            if(callback){
                callback(returns);
            }
        });
    };
    /**
     * @method 向collection中插入数据
     *
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      chatRooms.insert({url:document.location.href,title:document.title},function(id){
     *          console.log(id); // 会返回collection _id
     *      });
     *
     * @param {Object} value
     * @param {Function} callback
     */
    End.prototype.insert = function(value,callback){
        this.data(value,'insert',callback,null);
    };
    End.prototype.remove = function(callback){
        this.data(null,'remove',callback)
    };
    /**
     * @method 修改数据的值
     *
     *      @example
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      var room = chatRooms.child('5155bd645ba882d606000001');
     *      var roomURL = room.child('url');
     *      roomURL.set('m.baidu.com',function(result){
     *          console.log(result);// 回返回是否成功 true or false
     *      });
     *
     * @param {Object} value
     * @param {Function} callback
     */
    End.prototype.set = function (value,callback) {
        this.data(value,'set',callback,null);
    };
    /**
     * @method 向数组插入数据
     *
     *      @example
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      var room = chatRooms.child('5155bd645ba882d606000001');
     *      var roomMsgs = room.child('msgs');
     *      roomMsgs.push({user:'mdemo',msg:'@test'},function(result){
     *          console.log(result);// 回返回是否成功 true or false
     *      });
     *
     * @param {Object} value
     * @param {Function} callback
     */
    End.prototype.push = function(value,callback){
        this.data(value,'push',callback,null);
    };
    /**
     * @method 修改数据，具体使用可参考mongoDB
     *
     *      @example
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      var room = chatRooms.child('5155bd645ba882d606000001');
     *      room.update({url:'woxiangqu.com2',title:'mdemo2'},{},function(result){
     *          console.log(result);// 回返回是否成功 true or false
     *      });
     *
     * @param {Object} value
     * @param {Object} options
     * @param {Function} callback
     */
    End.prototype.update = function (value,options,callback) {
        this.data(value,'update',callback,options);
    };
    /**
     * @method 查询数据，具体使用可参考mongoDB
     *
     *      @example
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      var room = chatRooms.child('5155bd645ba882d606000001');
     *      chatRooms.find({_id:'5155bd645ba882d606000001'},{},function(result){
     *          console.log(result);// 返回查询结果
     *      });
     *
     * @param {Object} value
     * @param {Object} options
     * @param {Function} callback
     */
    End.prototype.find = function (value,options,callback) {
        this.data(value,'find',callback,options);
    };
    /**
     * @method 查询数据，根据路由中的id查询数据
     *
     *      @example
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      var room = chatRooms.child('5155bd645ba882d606000001');
     *      room.findById(function(result){
     *          console.log(result);// 返回查询结果
     *      });
     *
     */
    End.prototype.findById = function (callback){
        this.data(null,'findById',callback);
    };
    /**
     * @method 查询数据，根据路由中的collection Name查询数据
     *
     *      @example
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      chatRooms.findAll(function(result){
     *          console.log(result);// 返回查询结果
     *      });
     *
     */
    End.prototype.findAll = function(callback){
        this.data(null,'findAll',callback);
    };
    /**
     * @method 查询数据，查询指定数量的数据
     *
     *      @example
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      chatRooms.limit(5,function(rooms){
     *          console.log(rooms);// 返回查询结果
     *      });
     *
     * @param {Object} value 查询的数量
     * @param {Object} callback 回掉函数
     */
    End.prototype.limit = function(value,callback){
        this.data(value,'limit',callback)
    };
    /**
     * @method 修改数据，具体使用可参考mongoDB
     *
     *      @example
     *      var chatRooms = new End('chatRooms','http://localhost:8080');
     *      var room = chatRooms.child('5155bd645ba882d606000001');
     *      var roomMsgs = room.child('msgs');
     *      roomMsgs.on('child_added',function(item){
     *          console.log(item);// 返回最近新添加的消息
     *      });
     *
     * @param {Object} ontype ‘child_added’ 'child_removed' 'child_changed'
     * @param {Function} callback
     */
    End.prototype.on = function (ontype,callback) {
        _vars.socket.emit('onlisten',ontype,this.route);
        _vars.callbacks[this.route+'.'+ontype] = callback;
    };


}(window));
