/**
 * author: mdemo
 * Date: 13-1-25
 * Time: 下午3:32
 * Desc: End.js javascript sdk
 */
(function () {
    var _vars = {
        socket:{},
        callbacks:[]
    };
    var root = window;
    /**
     * End.js 数据构造器
     * @param route 数据路由地址 可为空，默认为data
     * @param url   后端数据服务地址 可为空 如果存在，将对webSocket进行初始化
     * @constructor
     */
    var End = function (route, url) {
        this.route = route || '';
        if (url) {
            _vars.socket = io.connect(url);
            _vars.socket.on('news', function (data) {
                _vars.socket.emit('my other event', {my:'data'},function(success){
                    console.log(success);
                });
            });
            _vars.socket.on('listen',function(data){
                _vars.callbacks[data.route](data);
            })
        }
    };
    root.End = End;
    /**
     * 根据路由，获取子元素
     * @param route 不可为空
     * @return 子元素实体
     */
    End.prototype.child = function (route) {
        return new End(this.route + '.' + route);
    };
    /**
     * 获取父元素
     * @return 父元素实体
     */
    End.prototype.parent = function () {
        var route = this.route.substring(0, this.route.lastIndexOf('.'));
        return new End(route);
    };
    /**
     * 数据处理通用方法
     * @param value 要处理的数据
     * @param method 方法类型
     * @param callback 回调函数
     * @param options
     */
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
     * collections元素添加
     * @param value 要添加的数据
     * @param callback 回调函数 成功返回id
     */
    End.prototype.insert = function(value,callback){
        this.data(value,'insert',callback,null);
    };
    /**
     * 添加或修改非数组数据
     * @param value 要添加的数据
     * @param callback 回调函数 会返回是否成功
     */
    End.prototype.set = function (value,callback) {
        this.data(value,'set',callback,null);
    };
    /**
     * 添加数组数据
     * @param value 要添加的数组元素
     * @param callback 回调函数 会返回是否成功
     */
    End.prototype.push = function(value,callback){
        this.data(value,'push',callback,null);
    };
    End.prototype.update = function (value,options,callback) {
        this.data(value,'update',callback,options);
    };
    End.prototype.findById = function (callback){
        this.data(null,'findById',callback)
    };
    End.prototype.findAll = function(callback){
        this.data(null,'findAll',callback);
    };
    End.prototype.on = function (ontype,callback) {
        _vars.socket.emit('onlisten',ontype,this.route);
        _vars.callbacks[this.route+'.'+ontype] = callback;
    };
}());
