# quick Start Demo

``` bash
# 克隆示例项目的仓库
$ git clone https://github.com/electron/electron-quick-start

# 进入这个仓库
$ cd electron-quick-start

# 安装依赖并运行
$ npm install && npm start
```

**Q**: This is probably not a problem with npm. There is likely additional logging output above. 
**A**: 

```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! H5@1.0.0 build: `webpack`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the H5@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     D:\nodejs\node_cache\_logs\2020-04-17T06_10_17_847Z-debug.log
```

缺少依赖，如果缺少依赖的话，在最顶上会提示你安装那些缺失的依赖，一开始我也没注意，确实这个提示语提示的信息跟依赖一点关系没有，但确确实实缺少依赖也会报这个错误，大家好好看看错误信息。
2、文件引用错误，文件引用错误也会报这个错，一般也会在最顶上提示你文件的相关信息。
3、node_modules依赖错误问题，如果以上两种方案都没有解决或者说根本没有报文件相关的错误信息的话，那就删除node_modules重新安装，用cnpm 或yarn安装试一下
