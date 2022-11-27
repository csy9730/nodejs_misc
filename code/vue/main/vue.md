# vue

vue 分为  html 和js 两部分。

js 部分 包括：data， 方法 methods，缓存的计算方法 computed， 监视器(watch)，hooks (created)
v-bind:class, v-bind:style

html 包括： v-bind， v-if， v-for，v-on 触发器， v-show, v-html, {{var}}
v-model, key <keep-alive> , v-slot v-once
 事件修饰符


mixins
### 组件系统
``` js
Vue.component('todo-item', {
    props: ['title'],
  template: '<li>这是个待办项</li>'
})
```

``` js
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})

```

Vue Router