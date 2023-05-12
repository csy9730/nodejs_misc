# 已解决：opensslErrorStack: [ ‘error:03000086:digital envelope routines::initialization error‘ ],



## 问题描述
我的node 版本为 17.9.1，在运行一个老项目的时候，报如下错误：

``` bash
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
```







## 解决方案
经查：问题原因是因为 node 17版本中的openssl和14版本的不同（老项目原本可以在node14版本下运行的）

解决方案，找到package.json 文件，加上：`set NODE_OPTIONS=--openssl-legacy-provider && `如下：

"dev": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",

在linux环境下，加上：`export NODE_OPTIONS=--openssl-legacy-provider && `，如下：

"dev": "export  NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",

文章知识点与官方知识档案匹配，可进一步