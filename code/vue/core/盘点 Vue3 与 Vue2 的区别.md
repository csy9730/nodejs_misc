# 盘点 Vue3 与 Vue2 的区别

[![img](https://p3-passport.byteimg.com/img/user-avatar/667cc53af70bda81a63f15b78115db66~100x100.awebp)](https://juejin.cn/user/219558054990765)

[cv搬砖工![创作等级LV.3](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/922e26916a444513bceddad5bcf437e1~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp)](https://juejin.cn/user/219558054990765)

2022年02月22日 14:13 · 阅读 23880

![盘点 Vue3 与 Vue2 的区别](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5433216e6384d06b5f0d7b9d2380948~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?)

# 一、Vue3 与 Vue2 区别详述

## 1. 生命周期

对于生命周期来说，整体上变化不大，只是大部分生命周期钩子名称上 + “on”，功能上是类似的。不过有一点需要注意，Vue3 在组合式API（Composition API，下面展开）中使用生命周期钩子时需要先引入，而 Vue2 在选项API（Options API）中可以直接调用生命周期钩子，如下所示。

```js
js复制代码// vue3
<script setup>     
import { onMounted } from 'vue';   // 使用前需引入生命周期钩子
 
onMounted(() => {
  // ...
});
 
// 可将不同的逻辑拆开成多个onMounted，依然按顺序执行，不会被覆盖
onMounted(() => {
  // ...
});
</script>
 
// vue2
<script>     
export default {         
  mounted() {   // 直接调用生命周期钩子            
    // ...         
  },           
}
</script> 
```

常用生命周期对比如下表所示。

| vue2          | vue3            |
| ------------- | --------------- |
| beforeCreate  |                 |
| created       |                 |
| beforeMount   | onBeforeMount   |
| mounted       | onMounted       |
| beforeUpdate  | onBeforeUpdate  |
| updated       | onUpdated       |
| beforeDestroy | onBeforeUnmount |
| destroyed     | onUnmounted     |

> Tips： setup 是围绕 beforeCreate 和 created 生命周期钩子运行的，所以不需要显式地去定义。

## 2. 多根节点

熟悉 Vue2 的朋友应该清楚，在模板中如果使用多个根节点时会报错，如下所示。

```js
js复制代码// vue2中在template里存在多个根节点会报错
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
 
// 只能存在一个根节点，需要用一个<div>来包裹着
<template>
  <div>
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</template>
```

但是，Vue3 支持多个根节点，也就是 fragment。即以下多根节点的写法是被允许的。

```js
js复制代码<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```

## 3. Composition API

Vue2 是选项API（Options API），一个逻辑会散乱在文件不同位置（data、props、computed、watch、生命周期钩子等），导致代码的可读性变差。当需要修改某个逻辑时，需要上下来回跳转文件位置。

Vue3 组合式API（Composition API）则很好地解决了这个问题，可将同一逻辑的内容写到一起，增强了代码的可读性、内聚性，其还提供了较为完美的逻辑复用性方案。

## 4. 异步组件（Suspense）

Vue3 提供 Suspense 组件，允许程序在等待异步组件加载完成前渲染兜底的内容，如 loading ，使用户的体验更平滑。使用它，需在模板中声明，并包括两个命名插槽：default 和 fallback。Suspense 确保加载完异步内容时显示默认插槽，并将 fallback 插槽用作加载状态。

```js
js复制代码<tempalte>
  <suspense>
    <template #default>
      <List />
    </template>
    <template #fallback>
      <div>
        Loading...
      </div>
    </template>
  </suspense>
</template>
```

在 List 组件（有可能是异步组件，也有可能是组件内部处理逻辑或查找操作过多导致加载过慢等）未加载完成前，显示 Loading...（即 fallback 插槽内容），加载完成时显示自身（即 default 插槽内容）。

## 5. Teleport

Vue3 提供 Teleport 组件可将部分 DOM 移动到 Vue app 之外的位置。比如项目中常见的 Dialog 弹窗。

```js
js复制代码<button @click="dialogVisible = true">显示弹窗</button>
<teleport to="body">
  <div class="dialog" v-if="dialogVisible">
    我是弹窗，我直接移动到了body标签下
  </div>
</teleport>
```

## 6. 响应式原理

Vue2 响应式原理基础是 Object.defineProperty；Vue3 响应式原理基础是 Proxy。

- Object.defineProperty 基本用法：直接在一个对象上定义新的属性或修改现有的属性，并返回对象。

```js
js复制代码let obj = {};
let name = 'leo';
Object.defineProperty(obj, 'name', {
  enumerable: true,   // 可枚举（是否可通过 for...in 或 Object.keys() 进行访问）
  configurable: true,   // 可配置（是否可使用 delete 删除，是否可再次设置属性）
  // value: '',   // 任意类型的值，默认undefined
  // writable: true,   // 可重写
  get() {
    return name;
  },
  set(value) {
    name = value;
  }
});
```

> Tips： `writable` 和 `value` 与 `getter` 和 `setter` 不共存。

搬运 Vue2 核心源码，略删减。

```js
js复制代码function defineReactive(obj, key, val) {
  // 一 key 一个 dep
  const dep = new Dep()
  
  // 获取 key 的属性描述符，发现它是不可配置对象的话直接 return
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) { return }
  
  // 获取 getter 和 setter，并获取 val 值
  const getter = property && property.get
  const setter = property && property.set
  if((!getter || setter) && arguments.length === 2) { val = obj[key] }
  
  // 递归处理，保证对象中所有 key 被观察
  let childOb = observe(val)
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // get 劫持 obj[key] 的 进行依赖收集
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if(Dep.target) {
        // 依赖收集
        dep.depend()
        if(childOb) {
          // 针对嵌套对象，依赖收集
          childOb.dep.depend()
          // 触发数组响应式
          if(Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
    }
    return value
  })
  // set 派发更新 obj[key]
  set: function reactiveSetter(newVal) {
    ...
    if(setter) {
      setter.call(obj, newVal)
    } else {
      val = newVal
    }
    // 新值设置响应式
    childOb = observe(val)
    // 依赖通知更新
    dep.notify()
  }
}
```

那 Vue3 为何会抛弃它呢？那肯定是因为它存在某些局限性。

主要原因：无法监听对象或数组新增、删除的元素。

Vue2 相应解决方案：针对常用数组原型方法push、pop、shift、unshift、splice、sort、reverse进行了hack处理；提供Vue.set监听对象/数组新增属性。对象的新增/删除响应，还可以new个新对象，新增则合并新属性和旧对象；删除则将删除属性后的对象深拷贝给新对象。

- Proxy Proxy 是 ES6 新特性，通过第2个参数 handler 拦截目标对象的行为。相较于 Object.defineProperty 提供语言全范围的响应能力，消除了局限性。

局限性：

(1)、对象/数组的新增、删除

(2)、监测 .length 修改

(3)、Map、Set、WeakMap、WeakSet 的支持

基本用法：创建对象的代理，从而实现基本操作的拦截和自定义操作。

```js
js复制代码let handler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : '';
  },
  set() {
    // ...
  },
  ...
};
```

搬运 vue3 的源码 reactive.ts 文件。

```js
js复制代码function createReactiveObject(target, isReadOnly, baseHandlers, collectionHandlers, proxyMap) {
  ...
  // collectionHandlers: 处理Map、Set、WeakMap、WeakSet
  // baseHandlers: 处理数组、对象
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  proxyMap.set(target, proxy)
  return proxy
}
```

## 7. 虚拟DOM

Vue3 相比于 Vue2，虚拟DOM上增加 patchFlag 字段。我们借助Vue3 Template Explorer来看。

```js
js复制代码<div id="app">
  <h1>vue3虚拟DOM讲解</h1>
  <p>今天天气真不错</p>
  <div>{{name}}</div>
</div>
```

渲染函数如下所示。

```js
js复制代码import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from vue
 
const _withScopeId = n => (_pushScopeId(scope-id),n=n(),_popScopeId(),n)
const _hoisted_1 = { id: app }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(h1, null, vue3虚拟DOM讲解, -1 /* HOISTED */))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(p, null, 今天天气真不错, -1 /* HOISTED */))
 
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(div, _hoisted_1, [
    _hoisted_2,
    _hoisted_3,
    _createElementVNode(div, null, _toDisplayString(_ctx.name), 1 /* TEXT */)
  ]))
}
```

注意第3个_createElementVNode的第4个参数即 patchFlag 字段类型。

字段类型情况：1 代表节点为动态文本节点，那在 diff 过程中，只需比对文本对容，无需关注 class、style等。除此之外，发现所有的静态节点（HOISTED 为 -1），都保存为一个变量进行静态提升，可在重新渲染时直接引用，无需重新创建。

```js
js复制代码// patchFlags 字段类型列举
export const enum PatchFlags { 
  TEXT = 1,   // 动态文本内容
  CLASS = 1 << 1,   // 动态类名
  STYLE = 1 << 2,   // 动态样式
  PROPS = 1 << 3,   // 动态属性，不包含类名和样式
  FULL_PROPS = 1 << 4,   // 具有动态 key 属性，当 key 改变，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5,   // 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6,   // 不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7,   // 带有 key 属性的 fragment 或部分子节点
  UNKEYED_FRAGMENT = 1 << 8,   // 子节点没有 key 的fragment
  NEED_PATCH = 1 << 9,   // 只会进行非 props 的比较
  DYNAMIC_SLOTS = 1 << 10,   // 动态的插槽
  HOISTED = -1,   // 静态节点，diff阶段忽略其子节点
  BAIL = -2   // 代表 diff 应该结束
}
```

## 8. 事件缓存

Vue3 的`cacheHandler`可在第一次渲染后缓存我们的事件。相比于 Vue2 无需每次渲染都传递一个新函数。加一个 click 事件。

```js
js复制代码<div id="app">
  <h1>vue3事件缓存讲解</h1>
  <p>今天天气真不错</p>
  <div>{{name}}</div>
  <span onCLick=() => {}><span>
</div>
```

渲染函数如下所示。

```js
js复制代码import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from vue
 
const _withScopeId = n => (_pushScopeId(scope-id),n=n(),_popScopeId(),n)
const _hoisted_1 = { id: app }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(h1, null, vue3事件缓存讲解, -1 /* HOISTED */))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(p, null, 今天天气真不错, -1 /* HOISTED */))
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(span, { onCLick: () => {} }, [
  /*#__PURE__*/_createElementVNode(span)
], -1 /* HOISTED */))
 
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(div, _hoisted_1, [
    _hoisted_2,
    _hoisted_3,
    _createElementVNode(div, null, _toDisplayString(_ctx.name), 1 /* TEXT */),
    _hoisted_4
  ]))
}
```

观察以上渲染函数，你会发现 click 事件节点为静态节点（HOISTED 为 -1），即不需要每次重新渲染。

## 9. Diff算法优化

搬运 Vue3 patchChildren 源码。结合上文与源码，patchFlag 帮助 diff 时区分静态节点，以及不同类型的动态节点。一定程度地减少节点本身及其属性的比对。

```js
js复制代码function patchChildren(n1, n2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
  // 获取新老孩子节点
  const c1 = n1 && n1.children
  const c2 = n2.children
  const prevShapeFlag = n1 ? n1.shapeFlag : 0
  const { patchFlag, shapeFlag } = n2
  
  // 处理 patchFlag 大于 0 
  if(patchFlag > 0) {
    if(patchFlag && PatchFlags.KEYED_FRAGMENT) {
      // 存在 key
      patchKeyedChildren()
      return
    } els if(patchFlag && PatchFlags.UNKEYED_FRAGMENT) {
      // 不存在 key
      patchUnkeyedChildren()
      return
    }
  }
  
  // 匹配是文本节点（静态）：移除老节点，设置文本节点
  if(shapeFlag && ShapeFlags.TEXT_CHILDREN) {
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      unmountChildren(c1 as VNode[], parentComponent, parentSuspense)
    }
    if (c2 !== c1) {
      hostSetElementText(container, c2 as string)
    }
  } else {
    // 匹配新老 Vnode 是数组，则全量比较；否则移除当前所有的节点
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense,...)
      } else {
        unmountChildren(c1 as VNode[], parentComponent, parentSuspense, true)
      }
    } else {
      
      if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, '')
      } 
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(c2 as VNodeArrayChildren, container,anchor,parentComponent,...)
      }
    }
  }
}
```

patchUnkeyedChildren 源码如下所示。

```js
js复制代码function patchUnkeyedChildren(c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
  c1 = c1 || EMPTY_ARR
  c2 = c2 || EMPTY_ARR
  const oldLength = c1.length
  const newLength = c2.length
  const commonLength = Math.min(oldLength, newLength)
  let i
  for(i = 0; i < commonLength; i++) {
    // 如果新 Vnode 已经挂载，则直接 clone 一份，否则新建一个节点
    const nextChild = (c2[i] = optimized ? cloneIfMounted(c2[i] as Vnode)) : normalizeVnode(c2[i])
    patch()
  }
  if(oldLength > newLength) {
    // 移除多余的节点
    unmountedChildren()
  } else {
    // 创建新的节点
    mountChildren()
  }
 
}
```

## 10. 打包优化

Tree-shaking：模块打包 webpack、rollup 等中的概念。移除 JavaScript 上下文中未引用的代码。主要依赖于 import 和 export 语句，用来检测代码模块是否被导出、导入，且被 JavaScript 文件使用。

以 nextTick 为例子，在 Vue2 中，全局API暴露在Vue实例上，即使未使用，也无法通过 tree-shaking 进行消除。

```js
js复制代码import Vue from 'vue';
 
Vue.nextTick(() => {
  // 一些和DOM有关的东西
});
```

Vue3 中针对全局和内部的API进行了重构，并考虑到 tree-shaking 的支持。因此，全局API现在只能作为ES模块构建的命名导出进行访问。

```js
js复制代码import { nextTick } from 'vue';   // 显式导入
 
nextTick(() => {
  // 一些和DOM有关的东西
});
```

通过这一更改，只要模块绑定器支持 tree-shaking，则Vue应用程序中未使用的 api 将从最终的捆绑包中消除，获得最佳文件大小。

受此更改影响的全局API如下所示。

- Vue.nextTick
- Vue.observable （用 Vue.reactive 替换）
- Vue.version
- Vue.compile （仅全构建）
- Vue.set （仅兼容构建）
- Vue.delete （仅兼容构建）

内部API也有诸如 transition、v-model 等标签或者指令被命名导出。只有在程序真正使用才会被捆绑打包。Vue3 将所有运行功能打包也只有约22.5kb，比 Vue2 轻量很多。

## 11. TypeScript支持

Vue3 由 TypeScript 重写，相对于 Vue2 有更好的 TypeScript 支持。

- Vue2 Options API 中 option 是个简单对象，而 TypeScript 是一种类型系统，面向对象的语法，不是特别匹配。
- Vue2 需要vue-class-component强化vue原生组件，也需要vue-property-decorator增加更多结合Vue特性的装饰器，写法比较繁琐。

# 二、Options API 与 Composition API

Vue 组件可以用两种不同的 API 风格编写：Options API 和 Composition API。

## 1. Options API

使用 Options API，我们使用选项对象定义组件的逻辑，例如data、methods和mounted。由选项定义的属性在 this 内部函数中公开，指向组件实例，如下所示。

```js
js复制代码<template>
  <button @click="increment">count is: {{ count }}</button>
</template>
 
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  mounted() {
    console.log(`The initial count is ${this.count}.`);
  }
}
</script>
```

## 2. Composition API

使用 Composition API，我们使用导入的 API 函数定义组件的逻辑。在 SFC 中，Composition API 通常使用

```js
js复制代码<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
 
<script setup>
import { ref, onMounted } from 'vue';
 
const count = ref(0);
 
function increment() {
  count.value++;
}
 
onMounted(() => {
  console.log(`The initial count is ${count.value}.`);
})
</script>
```

分类：

[前端](https://juejin.cn/frontend)

标签：

[Vue.js](https://juejin.cn/tag/Vue.js)