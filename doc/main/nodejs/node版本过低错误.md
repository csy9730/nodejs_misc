# node版本过低错误
前两天装hexo ，运行**hexo init**命令时报错

```
> /usr/lib/node_modules/hexo-cli/node_modules/chokidar/index.js:151
>  async remove(item) {
>  ^^^^^^
>
> SyntaxError: Unexpected identifier
>  at createScript (vm.js:56:10)
>  at Object.runInThisContext (vm.js:97:10)
>  at Module._compile (module.js:549:28)
>  at Object.Module._extensions…js (module.js:586:10)
>  at Module.load (module.js:494:32)
>  at tryModuleLoad (module.js:453:12)
>  at Function.Module._load (module.js:445:3)
>  at Module.require (module.js:504:17)
>  at require (internal/module.js:20:19)
>  at Object. (/usr/lib/node_modules/hexo-cli/node_modules/hexo-fs/lib/fs.js:6:18)
>  at Module._compile (module.js:577:32)
>  at Object.Module._extensions…js (module.js:586:10)
>  at Module.load (module.js:494:32)
>  at tryModuleLoad (module.js:453:12)
>  at Function.Module._load (module.js:445:3)
>  at Module.require (module.js:504:17)
```

>  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200721091157736.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTIzMTMzNjE=,size_16,color_FFFFFF,t_70)

原因nodejs版本太低了，查看node版本

`node -v`

显示v6.17.1
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200721091311706.png)
 好吧确实有点低了

解决方法：全局安装

> npm install -g n

n管理工具

> n latest

更新node

> PATH="$PATH"

替换版本

再次查看版本是V14.5.0![在这里插入图片描述](https://img-blog.csdnimg.cn/2020072109155692.png)

更新之后就可以用了！