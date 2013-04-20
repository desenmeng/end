/**
 * author: mdemo
 * Date: 13-4-2
 * Time: 下午10:36
 * Desc: chatRoom by End.js
 */
$.cookie('the_cookie', 'the_value',{path:'/'});
var chat = new End('chat','http://localhost:8080'),
    chatRoom = chat.child(window.location.search.split('?')[1]),
    chatMsgs = chatRoom.child('msgs');
chatMsgs.on('child_added',function(msg){
    $('.msgs').append('<div class="msg">'+msg.value.name+' : '+msg.value.text+'</div>');
});
$('#btn_send').click(function(){
    var name = $('.txt_send_name').val();
    var text = $('.txt_send_text').val();
    chatMsgs.push({name:name,text:text},function(result){
       console.log(result);
    });
});

