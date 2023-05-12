# Deno

一个 安全的 JavaScript 和 TypeScript 运行时环境

[安装 Deno](https://www.denojs.cn/#installation)

Deno 是一个简单、先进且安全的 JavaScript 和 TypeScript 运行时环境，其基于 V8 引擎并采用 Rust 编程语言构建。

1. 默认安全设置。除非 显式开启，否则不能访问文件、网络，也不能访问运行环境。
2. 天生支持 TypeScript。
3. 只有一个唯一的可执行文件。
4. 自带实用工具，例如依赖检查器 (`deno info`) 和代码格式化工具 (`deno fmt`)。
5. 有一套经过审核（审计）的标准模块， 确保与 Deno 兼容： [deno.land/std](https://deno.land/std)
6. 有大量的 [企业对使用 Deno 感兴趣](https://github.com/denoland/deno/wiki#companies-interested-in-deno)

## 安装 Deno

Deno 没有外部依赖，以单一可以执行文件发布。你可以 使用下面的安装程序安装 Deno，或者先从 [版本发布页面](https://github.com/denoland/deno/releases)下载已发布的二进制可执行文件。

通过 Shell (Mac, Linux) 安装：

```bash
curl -fsSL https://deno.land/install.sh | sh
```

复制

通过 PowerShell (Windows) 安装：

```bash
iwr https://deno.land/install.ps1 -useb | iex
```

复制

通过 [Homebrew](https://formulae.brew.sh/formula/deno) (Mac) 安装：

```bash
brew install deno
```

复制

通过 [Chocolatey](https://chocolatey.org/packages/deno) (Windows) 安装：

```bash
choco install deno
```

复制

通过 [Scoop](https://scoop.sh/) (Windows) 安装：

```bash
scoop install deno
```

复制

利用 [Cargo](https://crates.io/crates/deno)从源码构建并安装：

```bash
cargo install deno --locked
```

复制

参见 [deno_install](https://github.com/denoland/deno_install) 了解更多安装方式。

## Deno 入门

试着运行这个简单的程序：

```bash
deno run https://deno.land/std/examples/welcome.ts
```

复制

或者来个复杂点儿的：

```typescript
import { serve } from "https://deno.land/std@0.121.0/http/server.ts";

console.log("http://localhost:8000/");
serve((req) => new Response("Hello World\n"), { port: 8000 });
```

复制

你可以在 参考手册中找到深入的介绍、示例和环境设置指南。

运行时环境文档

Deno 的基本运行时文档可以在 [doc.deno.land](https://doc.deno.land/builtin/stable)网址上找到。

Deno 自带的 参考手册 包含了对更复杂的 运行时函数的深入讲解、介绍了 Deno 构建基础的概念、 详细介绍了 Deno 的内部结构、如何 在自己的应用中嵌入 Deno以及如何使用 Rust 插件扩展 Deno。

该参考手册还包含了有关 Deno 提供的内置工具的信息。

标准模块

与 Deno 运行时同时提供的还有一系列经过审核的 标准模块，Deno 核心团队将对这些模块进行审查并 保证他们可以用于特定版本的 Deno。这些模块存放于 [denoland/deno_std](https://github.com/denoland/deno_std) 源码仓库中。

这些标准模块位于 deno.land/std 并与所有其它与 Deno 兼容的 ES 模块一样通过 URL 分发 。

第三方模块

eno 可以从 web 上的任何位置导入（import）模块，例如 GitHub、个人 web 服务器 或类似 [Skypack](https://www.skypack.dev/), [jspm.io](https://jspm.io/), [jsDelivr](https://www.jsdelivr.com/) 或 [esm.sh](https://esm.sh/)的 CDN。

为了便于使用第三方模块，Deno 提供了一些 内置工具，例如 `deno info` 和 `deno doc`。deno.land 网站上也提供了一个 web 界面 用于查看模块的文档。你可以在 [doc.deno.land](https://doc.deno.land/)网址上找到。

deno.land 网站还为兼容 Deno 的 ES 模块提供了一个简单的公共托管服务。可以在 deno.land/x网址上找到。



[https://www.denojs.cn/](https://www.denojs.cn/)



