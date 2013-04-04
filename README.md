##End.js -- a Realtime BaaS like Firebase by Socket.io and MongoDB

>Firebase -- Scalable real-time backend .Build apps fast without managing servers.

>End.js -- Package like Firebase what you can deploy in your own server.
             
## Features

### Realtime

* Distributed (multi-process) architecture
* Flexible server extension
* Full performance optimization and test

### Easy

* Simple API
* Lightweight

### Like Firebase

* api 

##Demo

```javascript
	var chat = new End('chat','http://localhost:8080'),
    chatRoom = chat.child(window.location.search.split('?')[1]),
    chatMsgs = chatRoom.child('msgs');
	chatMsgs.on('child_added',function(msg){
    	$('.msgs').append('<div class="msg">'+msg.value.name+' : '+msg.value.text+'</div>');
	});
	$('#btn_send').click(function(){
    	var name = $('.txt_send_name').val();
    	var text = $('.txt_send_text').val();
    	chatMsgs.push({name:name,text:text});
	});
 
```

## Contributors
* [@mdemo](http://weibo.com/mdemo)


## License

(The MIT License)

Copyright (c) 2012-2013 [@mdemo](http://weibo.com/mdemo) and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
