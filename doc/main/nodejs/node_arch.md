# node_arch

## overview

```
D:\Program Files\nodejs
etc/
node_modules/
node.exe
npm
npm.cmd
npx
npx.cmd
```

### npm
命令行中执行npm，windows下调用npm.cmd ，linux下调用npm。
两者都是脚本，npm.cmd是batch脚本，npm是bash脚本

npm.cmd的内容是：
``` batch
:: Created by npm, please don't edit manually.
@ECHO OFF

SETLOCAL

SET "NODE_EXE=%~dp0\node.exe"
IF NOT EXIST "%NODE_EXE%" (
  SET "NODE_EXE=node"
)

SET "NPM_CLI_JS=%~dp0\node_modules\npm\bin\npm-cli.js"
FOR /F "delims=" %%F IN ('CALL "%NODE_EXE%" "%NPM_CLI_JS%" prefix -g') DO (
  SET "NPM_PREFIX_NPM_CLI_JS=%%F\node_modules\npm\bin\npm-cli.js"
)
IF EXIST "%NPM_PREFIX_NPM_CLI_JS%" (
  SET "NPM_CLI_JS=%NPM_PREFIX_NPM_CLI_JS%"
)

"%NODE_EXE%" "%NPM_CLI_JS%" %*
```

所以执行`npm`相当于执行:
`"D:\Program Files\nodejs\node.exe" "D:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js"`


npm 内容是：
``` bash
#!/bin/sh
(set -o igncr) 2>/dev/null && set -o igncr; # cygwin encoding fix

basedir=`dirname "$0"`

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

NODE_EXE="$basedir/node.exe"
if ! [ -x "$NODE_EXE" ]; then
  NODE_EXE=node
fi

NPM_CLI_JS="$basedir/node_modules/npm/bin/npm-cli.js"

case `uname` in
  *MINGW*)
    NPM_PREFIX=`"$NODE_EXE" "$NPM_CLI_JS" prefix -g`
    NPM_PREFIX_NPM_CLI_JS="$NPM_PREFIX/node_modules/npm/bin/npm-cli.js"
    if [ -f "$NPM_PREFIX_NPM_CLI_JS" ]; then
      NPM_CLI_JS="$NPM_PREFIX_NPM_CLI_JS"
    fi
    ;;
  *CYGWIN*)
    NPM_PREFIX=`"$NODE_EXE" "$NPM_CLI_JS" prefix -g`
    NPM_PREFIX_NPM_CLI_JS="$NPM_PREFIX/node_modules/npm/bin/npm-cli.js"
    if [ -f "$NPM_PREFIX_NPM_CLI_JS" ]; then
      NPM_CLI_JS="$NPM_PREFIX_NPM_CLI_JS"
    fi
    ;;
esac

"$NODE_EXE" "$NPM_CLI_JS" "$@"
```

所以执行`npm`相当于执行:
`/usr/bin/node /usr/lib/node_modules/npm/bin/npm-cli.js`


同理： npx对应`\node_modules\npm\bin\npx-cli.js`



## npm

### init

## npx
npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！
```
npx webpack -v
npx github:piuccio/cowsay hello
npx http-server

```
就是运行的时候，会到 node_modules/.bin 路径和环境变量 $PATH 里面，检查命令是否存在。