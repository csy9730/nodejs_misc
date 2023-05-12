# 如何编写兼容全平台的 NPM 工程化脚本

[![beet](https://picx.zhimg.com/v2-754447b2cba147f522d0311306c2ecf8_l.jpg?source=172ae18b)](https://www.zhihu.com/people/ur-apprentice)

[beet](https://www.zhihu.com/people/ur-apprentice)

3 人赞同了该文章

## 写下一时爽的脚本

在稍稍复杂的代码库中，为保证一致性，我们通常会把项目的关键构建步骤记录下来，方便协作者或贡献者。在一个标准的 JavaScript / Node.js 项目中，这些脚本会统一放在 `package.json` 文件的 `scripts` 字段里。

这类脚本可能很直观：

```bash
rm -rf dist
```

也可能非常神秘(运行了一个脚本)：

```bash
node dist/bundle.js
```

我们给这些实现某些功能的脚本各取一个非常非常具有描述性的文字(比如 `fmt`)，下次就可以使用喜欢的包管理器运行它们啦！这种机制既方便集中维护，又能保证构建的一致性(借助脚本的生命周期 `pre` `post` 我们还能控制构建的流程)。

所以，NPM 脚本是工程化的利器，这句话没毛病。可是“一时爽的脚本”是个什么意思？

好吧，当我写下这篇文章时，已经体验过无数次运行失败的痛苦了。这问题的始作俑者就是当时“一时爽”写下脚本的我。

希望下文的一些小经验能给到在工程化经验不足的同学们，如果能给到一些解决思路，那更好

话不多说，请看下文 ...

## 解决跨平台问题

跨平台，即跨操作系统，再狭义一点说成 windows | linux | macOS 也没多大问题，咱们基本都是在这三个平台上完成开发的。虽说 linux 分发版有很多，包管理器也有多种花样，但命令行的工具链(Unix 提供的那一套命令行工具)和软件仓库中的软件包基本保持着一致性，在一个 distro 上的工具基本都能在另一个 disto 上边儿找到。

我目前想到了三类工具，我们依次来看。

### 1. Unix 命令行工具

我们知道，macOS 和 linux 是兼容 Unix 命令，常见的有 `cd` `rm` `cp` `grep` 等。但是，windows 不一定支持呀！

所以，在使用这些命令前，应该首先调研一下各个平台的支持情况，并且要注意少使用仅仅只有 Unix 里支持的高级选项。为什么这么说呢？

我们可以深入挖一挖 `cd` 这个命令，在 *cmd.exe* 或 *powershell.exe* 上都是受支持的，那我们的脚本写上 `cd dir/subdir` 就没问题，甚至 `cd ./dir` `cd ../parentdir` 这种[点索引](https://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/23242004/what-is-double-dot-and-single-dot-in-linux)都是支持的，好，看起来挺顺滑的。

但是，当我们加上高级选项后，windows 就无法正确处理了。比如 `cd -P dir` 加上了 `-P` 选项，那么咱们的 cmd.exe 或 *powershell.exe* 就该报错了。是的，如果你用惯了 linux，写 NPM Scripts 时就容易犯这种错误，这种不一致性就是痛苦的来源。

> *大家可能会问，为什么 windows 提供了名字一样的命令行工具，行为却不一样？*

归根结底，windows 不是一个 [POSIX](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/POSIX) 兼容的操作系统，因为从一开始 windows 和 unix 就是竞争关系，两者的设计哲学完全不同，POSIX 这个所谓的”可移植操作系统标准“很大程度上与 unix 兼容(嘘！据说它最开始的简称是 POS，但是大家统一认为 unix 的那一套太可移植了，叫 POSIX 才像样嘛！)。所以 windows 不会去兼容 POSIX 这套标准(天生偏向 unix 的标准)，像 `cd` `ls` 这样的命令能在 windows 上出现只是因为它们太常用了！！！

我们应该想尽办法规避上面的错误，也就是说，确保你所使用的命令在所有平台上行为一致。我推荐大家可以参考如下流程：在维基百科上搜索目标命令，查看平台兼容性 ⇒ 如果兼容，对比[微软命令文档](https://link.zhihu.com/?target=https%3A//docs.microsoft.com/en-us/windows-server/administration/windows-commands/cd)和 Unix 命令 Manual 中选项的使用是否相同 ⇒ 取两者的交集，确保写下行为一致的脚本。

### 2. Node 运行脚本文件

我们可以自己编写有特定功能的脚本；借助 Node 的内置模块以及各种工程工具提供的 API 接口，这些脚本能做很多事。

事实上，很多知名开源项目就是这么做的。毕竟使用 Node 做过 CLI 工具的同学都知道，这其实就是一个命令行工具的原型了，这种方案适合定制化程度比较高的任务，因为一般简单的任务咱们用现成的跨平台命令行工具解决就行了(第三点会详细讲这种方案)。

需要唠唠的是如何使用 TypeScript 编写脚本。喜欢 TypeScript 的同学肯定深有同感，大家倾向于保持后缀的一致性，测试要用 `.ts` ，脚本也要 `.ts` 。这也就意味着我们运行脚本前需要经过一个编译 TS 的过程，不然是跑不动滴，解决方案是使用 [ts-node](https://link.zhihu.com/?target=https%3A//github.com/TypeStrong/ts-node) 这种即时运行的小工具，如果你非常在意速度，可以尝试基于 esbuild 的 TS 运行工具，比如 [esno](https://link.zhihu.com/?target=https%3A//github.com/antfu/esno) 这类新工具。

### 3. 使用 NPM 包

这是我最推荐的一种方案，简单稳定。这些工具包大都经过测试，coverage 很高，相比自己从零开始的脚本要稳定得多，并且通过添加它们到 dev 依赖，我们可以在安装依赖的同时获得这些工具的所有能力，下面我简单介绍几个我常用的包。

1. [rimraf](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/rimraf) 解决 `rm -rf` 在 windows 上不适用的问题
2. [npm-run-all](https://link.zhihu.com/?target=https%3A//github.com/mysticatea/npm-run-all) 可以同步或并发执行我们写好的 npm 脚本，缩减重复的 `npm run` 语法
3. [globby-cli](https://link.zhihu.com/?target=https%3A//github.com/jamiebuilds/globby-cli) 加强版的 glob 匹配，非常适合本身不支持 glob 但需要匹配多个文件的场景
4. [Sindre Sorhus](https://link.zhihu.com/?target=https%3A//github.com/sindresorhus) 大佬的很多小工具都非常好用，大家可以多去逛逛

你也可以使用没有发布在 NPM 上但跨平台的 CLI 工具，不过一定要在说明文档或贡献文档中声明这个工具的安装方法。

## 解决环境问题

> 前面我们解决的都是工具的问题，接下来聊聊跨平台环境的问题。

环境问题本质上是由 Shell 对命令的解释差异导致的，linux 和 macOS 上运行的 Unix Shell 是一种行为，windows 上的 powershell 或 cmd.exe 又是另一种行为。

> npm scripts 默认用 cmd.exe 解释，你可以使用 `npm config set script-shell` 命令改为 powershell

两者的行为有很大差异，我列举几个与我们日常开发有关的问题及解决方案。

### 1. 环境变量的设定

我们在开发中，习惯通过环境变量的值决定程序的行为，当存在私密信息时，我们也习惯用环境变量来替代这些信息，做到最基本的保密。

对于临时的环境变量设定，在 Unix Shell 中是我们熟悉的格式，但是在 windows 上做不到。我们可以使用 [cross-env](https://link.zhihu.com/?target=https%3A//github.com/kentcdodds/cross-env) 统一这种行为，使用起来也很简单：

```bash
cross-env FIRST_ENV=one SECOND_ENV=two node ./my-program
```

对于持久保存的私密环境变量，我们可以使用 `.env` 文件借助 [dotenv](https://link.zhihu.com/?target=https%3A//github.com/motdotla/dotenv) 工具来自动载入环境变量。

### 2. 多命令分隔符 && 、||、&、;

在逻辑表示方面，这三个分隔符在几个操作系统上各不相同，具体行为可参照下表：

![img](https://pic4.zhimg.com/80/v2-9e7764c22cce337fae20fd68112e9627_720w.webp)

我们可以看到，powershell 第七版引入了 [Pipeline chain operators](https://link.zhihu.com/?target=https%3A//docs.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-70%3Fview%3Dpowershell-7)，支持了类似于 Unix Shell 的多命令连接符，但是一般我们 windows 机器上预装的是 powershell 5，所以 powershell 7 需要用户手动安装；很少有人主动装上了第七版，因此我们还得考虑不支持的情况。更糟糕的是 `-And` 和 `-Or` 连接符还会失去所有输出，只会返回布尔值，所以严格来说，它不是命令行的逻辑符，它是更偏向脚本语言层面的操作符，不建议使用。

一种 workaround 是使用 cmd.exe 来运行它，这样至少能做到 windows 平台的命令一致：

```bash
cmd /C "command 1 && command 2 || command 3"
```

那么有没有解决方案能把这些不一致性降到最低呢？

我的初步想法是使用某个工具接受统一的命令作为参数，再根据操作系统的特性处理后再执行这些命令，可惜没有找到类似工具。

那我们就退一步吧，把两端的命令都写上，让工具根据操作系统去执行就好了，这就引出了 [run-script-os](https://link.zhihu.com/?target=https%3A//github.com/charlesguse/run-script-os) 这个小工具，使用起来很直观，只不过麻烦了点：

```bash
"test": "run-script-os",
"test:win32": "echo 'del whatever you want in Windows 32/64'",
"test:darwin:linux": "echo 'You can combine OS tags and rm all the things!'",
"test:default": "echo 'This will run on any platform that does not have its own script'"
```

### 3. 重定向 Pipeline

其实我上面提到的所有 Shell 都支持使用 `|` 进行输出 → 输入的重定向，在这里单独提出来是为了消除大家的顾虑，不至于畏手畏脚地不去使用它。

> 本文就到这儿啦，随时欢迎大家提出问题 & 指正错误 ~~

发布于 2021-10-19 17:35

[npm](https://www.zhihu.com/topic/19625829)

[Node.js](https://www.zhihu.com/topic/19569535)

[前端工程化](https://www.zhihu.com/topic/20010840)