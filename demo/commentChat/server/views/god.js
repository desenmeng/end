/**
 * author: mdemo
 * Date: 13-1-14
 * Time: 下午4:58
 * Desc:
 */

(function(win,io){
    var god = win.god = {
        version:"beta",
        global:win
    };
    var _vars = {

    };
    var _funs = {
       getID:function(fileName){
           var scripts = document.getElementsByTagName("script");
           for(var i =0; i< scripts.length;i++){
               var src = scripts[i].src;
               if(src.indexOf(fileName)!==-1){
                   src = src.substring(src.lastIndexOf("id="));
                   userID = src.split('=')[1];
                   console.log(userID);
                   break;
               }
           }
           return userID;
       }
    };
    god.vars = {
        id:_funs.getID('god.js')
    };
    god.funs = {
        addDom:function(){

        }

    };
})(window,io);
