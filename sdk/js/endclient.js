/**
 * author: mdemo
 * Date: 13-1-25
 * Time: 下午3:32
 * Desc: End.js javascript sdk
 */
(function (win) {
    /**
     * end框架的全局对象，也是框架内部所有类的命名空间
     */
    var end = win.end = {
        version:"0.0",
        global:win
    };
    var _vars = {
        socket:{}
    };
    function Base(route){
        this.route = route;
    }
    Base.prototype.child = function(route){
        return new Base(this.route+'.'+route);
    };
    Base.prototype.parent = function(){
        return new Base();
    };
    end.init = function(url,app){
       _vars.socket = io.connect(url);
       _vars.socket.on('news',function(data){
          console.log(data);
          _vars.socket.emit('my other event',{my: 'data'});
       });
       return new Base();
    };

}(window));
