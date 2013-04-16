##End.js -- a Realtime BaaS like Firebase by Socket.io and MongoDB

>Firebase -- Scalable real-time backend .Build apps fast without managing servers.

>End.js -- Package like Firebase what you can deploy in your own server.

##相关地址  
[api文档](http://demohi.github.io/end/index.html#!/api/End)  
[入门文章](http://demohi.github.io/tags/End.js/)

##为什么开发End
  第一次看到[Firebase](http://www.firebase.com)就被它所吸引，此后尝试使用它开发了一个chrome聊天插件，开发过程中，Firebase极大的提高了开发效率。  
  由于对Firebase的强烈兴趣，所以毕设选择做一个类似的东西，便是[End.js](https://github.com/demohi/end)

##Firebase几个优点:  
1. 云服务，随时扩展，高性能，无需部署管理自己的服务器，数据库，大大减少工作量  
2. api简单，使用起来非常的方便，可大大减少代码量  
3. 可通过网页对数据进行管理，很方便  

##Firebase几个缺点  
1. 数据结构和数据库存储方式不一致（由于想支持REST方式读取数据）  
2. 不能部署自己的数据库（很多项目都需要自己维护数据库的）  
3. 目前数据操作能力教弱（有很多需求(稍微复杂点的查询)目前Firebase很难支持）  
4. 数据分析功能很弱，只能查看流量和当前在线人数(独立数据库的话，这部分很容易做的更强大)  
5. 不支持离线开发（废话。。）  
总结一下就是Firebase弱化了数据库的存在，看起来很酷，但是现实情况下出于安全、数据分析等考虑，自己维护数据库才是更合适的。  

##为什么使用End
1. 如果想部署一个自己的Firebase，可以考虑使用End
2. 增强了数据库操作能力
3. 尽量和Firebase api设计一致
4. 很方便的和其他Node Package结合使用

#End快速上手
[入门教程](http://demohi.github.io/2013/04/09/End.js-%E5%85%A5%E9%97%A8/)

##[api文档](http://demohi.github.io/end/index.html#!/api/End) 
[api文档](http://demohi.github.io/end/index.html#!/api/End) 
##[介绍文章](http://demohi.github.io/tags/End.js/)
[介绍文章](http://demohi.github.io/tags/End.js/)

## Contributors
* [@mdemo](http://weibo.com/mdemo)


##License
(The MIT License)

Copyright (c) 2013 [@mdemo](http://weibo.com/mdemo) and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
