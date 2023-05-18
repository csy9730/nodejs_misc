# Vue3新特性学习v-for的key已变更(非兼容)

[![img](https://p3-passport.byteimg.com/img/user-avatar/2386d1541a57864bc7f93540d54d4fa5~100x100.awebp)](https://juejin.cn/user/3790771824128190)

[xn213![创作等级LV.4](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4453379f1d416ca00c3619e796d330~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp)](https://juejin.cn/user/3790771824128190)

2021年11月10日 23:44 · 阅读 3209

这是我参与11月更文挑战的第9天，活动详情查看：[2021最后一次更文挑战](https://juejin.cn/post/7023643374569816095/)

## 前言

记录积累学习 `Vue3 及源码`! 之前有几篇文章有作 `Vue3`的一些**变更**学习总结的开始, 请直接转到文末[Vue3 学习总结目录:](https://juejin.cn/post/7028966834623741960#heading-6)

## 源码 & 文档

- Vue3 源码仓库 `vue-next`: [github.com/vuejs/vue-n…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-next)
- [Vue3.x 官方中文文档 https://v3.cn.vuejs.org/guide/introduction.html](https://link.juejin.cn/?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fguide%2Fmigration%2Fintroduction.html)
- [Vue3.x 官方中文文档 - 非兼容变更 v-for 的 key 的使用](https://link.juejin.cn/?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fguide%2Fmigration%2Fintroduction.html)

## `v-for`在节点和非节点上的 key 的用法已更改 ![非兼容的 v-for的key的使用](https://img.shields.io/badge/-%E9%9D%9E%E5%85%BC%E5%AE%B9-%23b00000)

`v-for` 在实际工作中用到的最普遍的, 后端请求数据要处理成可迭代的数据后再通过 `v-for` 渲染到页面, 如表格, 列表, 卡片等等. 而这迭代的每一项都要设置一个不同的 `uid`, 用于在修改删除等操作时的 `关键字key`. 这里的 key 就很重要了.

### Vue3.x 新增 自动生成唯一的 key 值

在 Vue2.x 中, 对于 `v-if/v-else/v-else-if` 的各分支项 `key` 是必须的, 需要我们自己配置, 而且不建议使用循环的索引 `index`作为 `key`, 相信大家都有踩到过这个 `use-index-for-key` 的坑了.

所以 **`Vue3.x`** 现在会自动生成唯一的 `key`, 不用我们手动添加了; 而如果我们还非要自己添加, 那就需要保证每个分支必须使用唯一的 `key`, 而不能通过故意使用相同的 `key` 来强制重用分支。

### Vue3.x 新增非兼容的 key 值的使用地方

在模板上使用 `key`: ` 的 `key` 应该设置在 ` 标签上 (而不是设置在它的子节点上)。

```html
html复制代码<!-- Vue 3.x -->
<template v-for="item in data" :key="item._id">
  <span>{{ item._id }}</span>
  <div>{{ item }}</div>
</template>
```

## Vue3 学习实战的几篇小总结:

- [Vue3 源码学习-工具函数 utils(二)](https://juejin.cn/post/7028239680738951198)
- [Vue3-初体验](https://juejin.cn/post/7024777183453249549),
- [Vue3-`生命周期` 和 `setup()函数`](https://juejin.cn/post/7024784477096263693),
- [Vue3-`computed & watch`](https://juejin.cn/post/7024792752940384292),
- [Vue3-`Teleport` 改变组件挂载的根节点](https://juejin.cn/post/7025630125253197861),
- [Vue3-`Suspense` 处理异步请求](https://juejin.cn/post/7026310705498292231),
- [Vue3-`defAsyncComponent` 异步组件(新增)](https://juejin.cn/post/7026310705498292231),
- [Vue3-`fragments` (新增)](https://juejin.cn/post/7026310705498292231),
- [Vue3-`v-model` (非兼容)](https://juejin.cn/post/7027478226750423070),

## 学习 && 记录积累 加油

分类：

[前端](https://juejin.cn/frontend)

标签：

[JavaScript](https://juejin.cn/tag/JavaScript)[Vue.js](https://juejin.cn/tag/Vue.js)