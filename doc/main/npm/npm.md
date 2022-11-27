# npm

## manager

### init

使用 package.json
package.json 位于模块的目录下，用于定义包的属性。接下来让我们来看下 express 包的 package.json 文件，位于 node_modules/express/package.json

### install


### list

### uninstall

### clean

如果你遇到了使用 npm 安 装node_modules 总是提示报错：报错: npm resource busy or locked.....。

可以先删除以前安装的 node_modules :

npm cache clean
npm install

### update
```
npm install -g npm

# 想更新到指定版本，运行指令
npm -g install npm@6.8.0
```

## help
```

H:\project>npm --help

Usage: npm <command>

where <command> is one of:
    access, adduser, audit, bin, bugs, c, cache, ci, cit,       
    clean-install, clean-install-test, completion, config,      
    create, ddp, dedupe, deprecate, dist-tag, docs, doctor,     
    edit, explore, fund, get, help, help-search, hook, i, init,
    install, install-ci-test, install-test, it, link, list, ln,
    login, logout, ls, org, outdated, owner, pack, ping, prefix,
    profile, prune, publish, rb, rebuild, repo, restart, root,
    run, run-script, s, se, search, set, shrinkwrap, star,
    stars, start, stop, t, team, test, token, tst, un,
    uninstall, unpublish, unstar, up, update, v, version, view,
    whoami

npm <command> -h  quick help on <command>
npm -l            display full usage info
npm help <term>   search for help on <term>
npm help npm      involved overview

Specify configs in the ini-formatted file:
    C:\Users\admin\.npmrc
or on the command line via: npm <command> --key value
Config info can be viewed via: npm help config

npm@6.13.4 C:\Program Files\nodejs\node_modules\npm
```