# ESLint 使用教程

[![img](https://p3-passport.byteimg.com/img/user-avatar/07817f042b0d99af7b39791a3807d305~100x100.awebp)](https://juejin.cn/user/3597257778925640)

[czpcalm![创作等级LV.4](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4453379f1d416ca00c3619e796d330~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp)](https://juejin.cn/user/3597257778925640)

2021年09月28日 09:59 · 阅读 11621

- [1. 什么是 EsLint](https://juejin.cn/post/7012798266089668645#1-什么是-eslint)
- [2. 为什么使用 ESLint](https://juejin.cn/post/7012798266089668645#2-为什么使用-eslint)
- [3. 快速上手](https://juejin.cn/post/7012798266089668645#3-快速上手)
- \4. 使用 ESLint 检查代码
  - [4.1. 在命令行中使用](https://juejin.cn/post/7012798266089668645#41-在命令行中使用)
  - [4.2. 在 VSCode 中使用](https://juejin.cn/post/7012798266089668645#42-在-vscode-中使用)
- \5. ESLint 配置
  - 5.1. 语言环境配置
    - [5.1.1. 环境 `env`](https://juejin.cn/post/7012798266089668645#511-环境-env)
    - [5.1.2. 全局变量 `globals`](https://juejin.cn/post/7012798266089668645#512-全局变量-globals)
    - [5.1.3. 解析选项 `parserOptions`](https://juejin.cn/post/7012798266089668645#513-解析选项-parseroptions)
    - [5.1.4. 使用其他解析器 `parser`](https://juejin.cn/post/7012798266089668645#514-使用其他解析器-parser)
  - [5.2. 规则配置 `rules`](https://juejin.cn/post/7012798266089668645#52-规则配置-rules)
  - 5.3. 使用插件 `plugins`
    - [5.3.1. 插件的命名](https://juejin.cn/post/7012798266089668645#531-插件的命名)
    - [5.3.2. 插件能带来什么](https://juejin.cn/post/7012798266089668645#532-插件能带来什么)
  - [5.4. 继承配置 `extends`](https://juejin.cn/post/7012798266089668645#54-继承配置-extends)
  - [5.5. 通过 Glob 匹配应用配置 `overrides`](https://juejin.cn/post/7012798266089668645#55-通过-glob-匹配应用配置-overrides)
  - [5.6. 忽略文件 `ignorePatterns`](https://juejin.cn/post/7012798266089668645#56-忽略文件-ignorepatterns)
  - [5.7. 使用注释进行配置](https://juejin.cn/post/7012798266089668645#57-使用注释进行配置)
  - 5.8. 配置层级与规则合并
    - [5.8.1. 配置文件层级](https://juejin.cn/post/7012798266089668645#581-配置文件层级)
    - [5.8.2. 配置的优先级](https://juejin.cn/post/7012798266089668645#582-配置的优先级)
    - [5.8.3. 规则的覆盖](https://juejin.cn/post/7012798266089668645#583-规则的覆盖)
- [6. 其他资源](https://juejin.cn/post/7012798266089668645#6-其他资源)

## 1. 什么是 EsLint

**Lint**（Linter） 是一种静态代码分析工具，用于标记代码中某些编码错误、风格问题和不具结构性（易导致 bug）的代码。简单理解就是一个**代码检查器**，检查目标代码是否符合语法和规定的风格习惯。 **ESLint** 是基于 ECMAScript/JavaScript 语法的 **Lint**，能够：

- 查出 JavaScript 代码语法问题。
- 根据配置的规则，标记不符合规范的代码。
- 自动修复一些结构、风格问题。

ESLint 的特点是**灵活、高度自定义**，用户可以通过多种方式配置在项目中应用的规则和其它配置，也可以自定义自己的规则，还可以通过插件的方式拓展功能。

## 2. 为什么使用 ESLint

在项目中使用 ESLint 对个人、团队的帮助都是显著的。

- 对个人：
  - 避免代码中的语法 bug、结构性问题。
  - 格式化代码，自动美化代码。
- 对团队：
  - 统一团队、项目中不同人的代码风格，降低维护成本。
  - （已经有既定的代码规范的团队）约束团队成员使用统一的规范。

现在，即使团队内没有形成统一的规范，在工程化项目中大部分会使用 ESLint 来帮助检查、统一项目中的代码。

## 3. 快速上手

**前提：Node.js(>=12.0.0) 且项目目录中存在 package.json 文件。**

1. 安装（不推荐全局安装）

```shell
shell
复制代码npm install --save-install eslint
```

1. 初始化

```shell
shell复制代码npx eslint --init

# 注：npx 表示从当前路径下查找命令，即 ./node_modules/.bin/eslint --init
```

ESLint 会询问一系列问题，根据你的回答生成对应的`.eslintrc.*`配置文件。

```json
json复制代码/* 
$ npx eslint --init
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard
✔ What format do you want your config file to be in? · JSON
*/

// 上面的回答对应下面的 .eslint.json 文件

{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["plugin:react/recommended", "standard"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {}
}
```

1. 配置你的规则（参照后面配置部分）
2. 至此，便可以使用 ESlint 来检查、修复代码中的问题了

（配置部分内容较多，而且简单上手无需太深入配置，后面会先说 ESLint 的使用，最后再总结配置内容）

## 4. 使用 ESLint 检查代码

### 4.1. 在命令行中使用

**注：现在已经很少在命令行使用 eslint 了，一般都通过编辑器插件的方式与编辑器配合使用，实现在编辑的过程中实时检查。这种方式可以稍微了解，加深理解。**

- 检查并打印发现的问题：`npx eslint [file|dir|glob]*`, 入：

```shell
shell复制代码# 检查多个文件
npx eslint file1.js file2.js

# 使用 glob 正则，检查目录下所有文件
npx eslint lib/**
```

- 使用`--fix`选项自动 fix 可修复问题，如：

```shell
shell复制代码# index.js 中可自动修复的问题会被修复并忽略
npx eslint --fix index.js
```

更多命令和参数，参看 [ESLint Docs: Command Line Interface](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Fuser-guide%2Fcommand-line-interface)，这里不深入。

### 4.2. 在 VSCode 中使用

注：除了 VSCode，其他编辑器也有对应的 ESlint 集成方式，参看 [ESLint Docs: Integrations](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Fuser-guide%2Fintegrations%23editors)。

首先，安装 [VSCode ESlint 插件](https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddbaeumer.vscode-eslint)。 需要注意，**插件并不内置 ESLint 核心代码**，而是自动查找项目中的 ESLint 库，在用户每次输入时调用`lint`命令，并在编辑器中标记代码问题，文档这样说明：

> The extension uses the ESLint library installed in the opened workspace folder. If the folder doesn't provide one the extension looks for a global install version.

这样的好处是，编辑器能兼容不同项目中不同版本的 ESLint，同时，能保证同一项目中，团队成员的 ESLint 版本一致。

如果希望在每次保持时，自动 fix 可修复问题，可以在 VSCode 中设置保存时 fix：

```json
json复制代码/*
* VSCode Settings JSON File
*/
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```

## 5. ESLint 配置

配置文件是 ESLint 最主要的配置方式。ESLint 配置文件支持多种格式，同一目录下，ESLint 按 `.eslintrc.js`, `.eslintrc.cjs`, `.eslintrc.yaml`, `.eslintrc.yml`, `.eslintrc.json`, `package.json 下的 eslintConfig 字段` 的顺序查找配置，相同目录下只有一个配置文件会生效。其中，常用的是`eslintrc.[js|json]`格式，下文采用 `eslint.json` 格式。

ESLint 还支持使用注释更灵活、细粒度地对特定文件、局部代码进行配置，常常用于复写特殊代码片段的规则。

ESLint 配置的主要内容包括 **执行环境 `env`**、**全局变量 `globals`**、**规则 `rules`**。

### 5.1. 语言环境配置

我们知道，不同的执行环境会向 JavaScript 注入不同的全局变量，如浏览器中的`window`，Node.js 的`process`。另外，不同的 ECMAScript 语法版本支持的语法和特性有所不同。因此，代码的合法性是与执行环境和环境支持的 ES 版本相关的。

为了 ESLint 能正确识别代码是否规范合法，我们必须配置代码的执行环境和支持的语法选项。

#### 5.1.1. 环境 `env`

ESLint 默认不开启任何环境，可以在`env`字段下使用`"env_name":true`的方式开启，环境之间不会互斥，可以同时开启多个环境，如：

```json
json复制代码{
  "env": {
    "browser": true,
    "node":true,
    "es6":true
  }
}
```

开启环境后，ESLint 能正常解析代码中的全局变量，可能还会开启对应的语法解析选项。常见的环境有：

- `browser`: 浏览器全局变量。
- `node`: Node.js 全局变量和作用域。
- `es6`: 支持 ES6 语法（不含 ES module），并开启 ES6 语法解析选项。

完整的环境列表，参看 [ESLint Docs: Specifying Environments](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Fuser-guide%2Fconfiguring%2Flanguage-options%23specifying-environments)。

#### 5.1.2. 全局变量 `globals`

`env` 可以方便地支持特定环境下的全局变量，但 JavaScript 的执行环境要复杂得多，每个模块和外部依赖都有可能注入自己的全局变量，为了避免这被识别成错误，需要在配置中指出代码中用到的外部全局变量。 `globals`字段用于设置代码中的全局变量，语法为`{"var_name": "off"|"readonly"|"writable"}`, 如：

```json
json复制代码{
  "globals":{
    "$":"readonly",
    "globalState":"writable"
  }
}
```

`"off"`的作用在于关闭`env`带来的全局变量，如在支持大部分 ES2015 语法，但不支持 Promise 的浏览器中，可以设置：

```json
json复制代码{
  "env":{
    "es6": true
  },
  "globals":{
    "Promise":"off"
  }
}
```

#### 5.1.3. 解析选项 `parserOptions`

在 ESLint 解析的时候提供一些语言特性的支持，如 ES 语法、JSX。ESLint 默认支持 ES5 语法。

配置语法语法如下：

```json
json复制代码{
  "parserOptions":{

    /* ecmaVersion: 指定 ECMA 语法版本
    *  取值：
    *      - "latest": 使用最新版本，现在 (2021) 等同于 12
    *      - 版本号：3, 5（默认）, 6, 7, 8, 9, 10, 11, 12
    *      - 年份命名法：2015(=6), 2016(=7), 2017(8) ...
    */ 
    "ecmaVersion":  "latest",

    /* sourceType: 脚本类型，普通脚本 或 ES 模块脚本
    *  取值："script"（默认） | "module"(ES 模块脚本）
    */
    "sourceType":"module",

    /* ecmaFeatures: 支持的特性语法*/
    "ecmaFeatures": {
      
      // 支持在全局使用 return 
      "globalReturn": true,

      // 默认使用严格模式（ES 5 或 以上）
      "impliedStrict": true,

      // 支持 JSX 语法
      "jsx": true 
    }
  }
}
```

需要注意的是，**开启更高的 ES 解析选项并不会自动支持对应的 ES 全局变量**。所以，为了支持最新的 ES 语法：

```json
json复制代码{
  "env":{
    // 支持 es 语法全局变量识别，这是必须的
    "es2021": true,
  },
  /* 下面是可选的，因为 es2021 会自动设置 "ecmaVersion": 12
  "parserOptions": {
    "ecmaVersion": 12
  }
  */
}
```

#### 5.1.4. 使用其他解析器 `parser`

ESLint 默认使用的是 [Espree](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Feslint%2Fespree) 解析器。你也可以通过`parser`字段使用其他解析器。 解析器需要满足两个条件：

- 必须是一个 Node 模块，并且在配置文件所在目录下能找到。比如同目录下的 npm 包，一个由路径指定的 js 文件。
- 满足 [ESLint 解析器接口](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Fdeveloper-guide%2Fworking-with-custom-parsers)。

**如果项目中用到一些语言增强工具（TypeScript、Babel）或者框架（React、Vue），就需要使用与之对应的解析器。** 以 TypeScript 为例，为了正确解析代码，你需要：

1. 在`.eslintrc.json`对应的目录下安装解析器

```shell
shell
复制代码npm install --save-dev @typescript-eslint/parser
```

1. 在配置文件中配置

```json
json复制代码{
  "parser": "@typescript-eslint/parser"
}
```

注：使用其他插件时，`parserOptions` 仍然有效，它会作为参数传递给解析器。

### 5.2. 规则配置 `rules`

`rules`是 ESLint 中最重要的配置，里面规定了将采用哪些规则去约束代码。

ESLint 提供了大量的 [内置规则](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Frules)。此外，使用插件可以添加适合特定场景下的规则集。

规则的配置语法是`{"rules": {"rule_name": state | [state, ...options] }}`, 其中，`state` 代表枚举值：

- `"off"` 或者 `0`: 关闭规则，常用于关闭某个来自`extends`中的规则。
- `"warn"` 或者 `1`: 规则校验不通过时发出 warning 提示。
- `"error"` 或者 `2`: 规则校验不通过时发出 error 提示，返回 1，表示 lint 检查不通过。

下面的配置方式都是合法的：

```json
json复制代码{
  "rules":{
    // 使用 "off", "warn", "error"
    "no-console": "warn",
    // 使用数字（不推荐，语义不明确）
    "for-direction": 1,
    // 数组语法，但没有额外配置项
    "no-else-return": ["error"],
    // 数组语法，一个配置项
    "eqeqeq":["error","always"],
    // 数组语法，多个配置项
    "quotes": ["error", "double", { "avoidEscape": true }]
  }
}
```

### 5.3. 使用插件 `plugins`

ESLint 支持第三方插件的使用，使用前，需要先在配置文件的目录上安装对应的 npm 包。

安装插件之后，就可以在 ESLint 的`plugins`数组中添加该配置文件需要使用的插件。不过，插件的各项规则配置都是默认关闭的，所以`plugins`只是使用插件功能的前提，你必须在`rules`,`extends`,`env`中开启你需要的规则特性。

```json
json复制代码{
  "plugins":["jest"],

  "extends": ["plugin:jest/recommended"],

  "env":{
    "jest/global":true
  },
  
  "rules":{
    "jest/valid-expect": "error"
  }
}
```

#### 5.3.1. 插件的命名

ESLint 对插件的命名做了规定：

- `eslint-plugin-` 缩写 ``: 如`eslint-plugin-jquery` 缩写 `jquery`。
- `@/eslint-plugin-` 缩写 `@/`: 如 `@jquery/eslint-plugin-jquery` 缩写 `@jquery/jquery`。
- `@/eslint-plugin` 缩写 `@`: 如 `@jquery/eslint-plugin` 缩写 `@jquery`。

一般使用不含 `eslint-plugin` 的简写形式。

#### 5.3.2. 插件能带来什么

ESLint 使用 `/XXX` 的方式指定插件内的规则或其他配置。根据 [ESLint Docs: Working with Plugins](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Fdeveloper-guide%2Fworking-with-plugins), 一个插件能带来：

- 额外的规则，如`{"rules": {"react/boolean-prop-naming": "warning"}}`。
- 环境，如`{"env": {"jest/global": true}}`。
- 配置，如`{"extends": ["plugin:react/recommended"]}`。
- 预处理器，如`{"process": "a-plugin/a-processor"}`。

### 5.4. 继承配置 `extends`

使用`extends`能很方便地继承已有配置的**全部特性**，包括`rules`, `env`, `extends`等。

配置继承与面向对象中“类的继承”类似。如果称被继承配置为“父配置”，继承配置为“子配置”，那么子配置具有父配置的所有特性，并且可以在子配置中的规则会覆盖父配置的同一规则。配置继承也具有传递性。

配置的继承极大方便了项目之间通用配置的共享，也避免了每次繁琐的大量规则配置。

`extends`数组包含了配置中继承的所有父配置，当只有一个父配置时，也可以使用`{"extend": "config-name"}`的形式。

父配置可以通过几种方式指定：

- ESLint 内置配置 `"eslint:recommended"` 和 `"eslint:all"`。
- 共享配置的包名称 `"eslint-config-"`, 命名及其缩写和插件命名类似。如

```json
json复制代码{
  "extends": ["standard"] // 同 eslint-config-standard
}
```

- 插件内导出的配置 `"plugin:a-plugin/config"`, `plugin:`前缀为了区分简写下的配置和插件包名。如

```json
json复制代码{
  // 别忘了 plugins
  "plugins": ["react"],
  "extends": ["plugin:react/recommended"]
}
```

- ESLint 配置的文件路径。如 `{"extends": "./.my-eslintrc.json"}`。

### 5.5. 通过 Glob 匹配应用配置 `overrides`

`overrides` 支持通过 [Glob 模式](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGlob_(programming)) 匹配特定文件集合，额外应用不同的配置。比如，我们经常需要在项目中根据文件类型应用不同的规则。

`overrides` 是一个配置对象数组，里面的对象支持大部分的 ESLint 配置，而且多了用于匹配文件的 `files` 数组和 `excludedFiles` 数组。当对文件进行 lint 检查时，目标文件相对于配置文件的相对路径会与这两组 glob 模式进行匹配，如果路径满足`files`中任何一个，且不满足`excludedFiles`中任何一个模式，则会被应用该配置。

```json
json复制代码/* ./src 目录下除了 a.js 下的 js 文件应用 no-alert 规则 */
{
  "overrides": [
    {
      "files": ["src/*.js"],
      "excludedFiles": "a.js",
      "rules": {
        "no-alert": "warn"
      }
    }
  ]
}
```

### 5.6. 忽略文件 `ignorePatterns`

`ignorePatterns`数组包含了一组 glob 模式，当文件路径匹配其中任意一个时被忽略，作用类似`.gitignore`。

一般都不希望对打包产物进行 lint 检查：

```json
json复制代码{
  "ignorePatterns": ["**/dist/**", "**/output/**"]
}
```

### 5.7. 使用注释进行配置

除了文件配置，ESLint 还支持使用注释进行文件内的配置，这种方式更灵活，一般作为补充。

注：如果通过命令行执行，还能通过命令参数注入配置，这里不讨论。

ESLint 注释区分`//` 和`/**/`, 可以在注释的同时说明原因，原因放在配置内容之后，用**两个或两个以上 `-`** 隔开。

常用的注释：

- 大部分时候，你只是想偷懒，关掉烦人的规则：

```js
js复制代码/* 
*  单行关闭 
*/
alert('foo'); // eslint-disable-line

// eslint-disable-next-line -- I don't want eslint 
alert('foo');

/* eslint-disable-next-line */
alert('foo');

alert('foo'); /* eslint-disable-line */

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');

foo(); // eslint-disable-line plugin/rule-name

/* 
*  块关闭 
*/
/* eslint-disable */
console.log("bar")
alert('foo');
/* eslint-enable */

/* eslint-disable no-alert, no-console */
alert('foo');
console.log('bar');
/* eslint-enable no-alert, no-console */

/*
*  整个文件关闭，在第一行使用  eslint-disable 
*/
/* eslint-disable */
alert('foo');
//...

/* eslint-disable no-alert */
alert('foo');
//...
```

- 可以直接进行规则配置：

```js
js复制代码/* eslint quotes: ["error", "double"], curly: 2 
  -----
  字符串内容含有'', 不想用转移和模版字符串
*/
const foo="'bar'"
```

- 全局变量：

```js
js复制代码// var1 只读，var2 读写
/* global var1, var2: writable */
```

- 环境：

```js
js
复制代码/* eslint-env node, mocha */
```

### 5.8. 配置层级与规则合并

#### 5.8.1. 配置文件层级

尽管一个目录下只有一个配置文件会生效，但 ESLint 支持在不同目录层级下放置多个配置文件。执行文件 lint 时，会从当前文件的目录开始，逐级往上查找配置文件，直到根目录或 遇到`{"root": true}`的配置，并合并不同层级的配置。

注：应该在项目根目录下设置 `{"root": true}` 避免不必要的查找和影响。

#### 5.8.2. 配置的优先级

由于 ESLint 支持多处配置，配置之间可能会冲突，需要规定优先级：

- 配置类型上： 注释 > 命令行参数 > 配置文件
- 文件层级上：（相对目标文件）近 > 远
- 同一目录内：（只会采用一个配置文件）js > cjs > yaml > yml > json > package.json
- 同一配置内：`overrides` > `rule` > `extends`
- 同一选项内：后者 > 前者

#### 5.8.3. 规则的覆盖

当多个地方的`rules`配置出现相同规则时，

- 如果该规则没有配置选项（只支持错误等级），则简单应用最高优先级。
- 如果该规则支持额外配置选项，且高优先级的规则配置没提供选项，则继承低优先级的选项；否则，只应用高优先级的配置和选项。如：
  - `"eqeqeq": ["error", "allow-null"]` + `"eqeqeq": "warn"`（高优先级） = `"eqeqeq": ["warn", "allow-null"]`
  - `"quotes": ["error", "single", "avoid-escape"]` + `"quotes": ["error", "single"]`（高优先级） = `"quotes": ["error", "single"]`

## 6. 其他资源

- [ESLint 官网](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2F) VS [ESLint 中文](https://link.juejin.cn/?target=https%3A%2F%2Fcn.eslint.org%2F)
- [Awesome ESLint](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdustinspecker%2Fawesome-eslint)
- [# 代码风格自动化最佳实践：ESLint+Prettier+lint-staged](https://juejin.cn/post/7018488201295691789/)

分类：

[开发工具](https://juejin.cn/freebie)

标签：

[ESLint](https://juejin.cn/tag/ESLint)[JavaScript](https://juejin.cn/tag/JavaScript)