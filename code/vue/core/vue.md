# vue

vue 分为  html 和js 两部分。

- js
- html


## js
js 部分 包括：data， 方法 methods，缓存的计算方法 computed， 监视器(watch)，hooks (created)
v-bind:class, v-bind:style

- 属性 data， 
- 定义的函数方法 methods，
- 缓存的计算方法 computed， 
- 监视器 watch，
- 钩子函数 hooks (created)
- 绑定对象 el

#### data
data 描述网页填充的内容，一般是对象。

data 可以不是一个对象，而是一个函数。


#### methods

#### computed
计算属性关键词: computed

我们可以使用 methods 来替代 computed，效果上两个都是一样的，但是 computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行。


#### computed setter
computed 属性默认只有 getter ，不过在需要时你也可以提供一个 setter.

``` js
var vm = new Vue({
  el: '#app',
  data: {
    name: 'Google',
    url: 'http://www.google.com'
  },
  computed: {
    site: {
      // getter
      get: function () {
        return this.name + ' ' + this.url
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.name = names[0]
        this.url = names[names.length - 1]
      }
    }
  }
})

// 调用 setter， vm.name 和 vm.url 也会被对应更新
vm.site = '教程 http://www.foo.com';
document.write('name: ' + vm.name);
document.write('<br>');
document.write('url: ' + vm.url);
```
#### watch

我们可以通过 watch 来响应数据的变化。

### Vue类

## html
html 包括： v-bind， v-if， v-for，v-on 触发器， v-show, v-html, {{var}}
v-model, key <keep-alive> , v-slot v-once
事件修饰符

- v-bind 为元素绑定属性，  `<pre><a v-bind:href="url">教程</a></pre>`
- v-if，  根据条件展示元素  `v-if="seen"`
- v-for， `<li v-for="site in sites">{{ site.name }}</li>`
- v-on 触发器，监听事件，并对用户的输入进行响应 `<a v-on:click="doSomething">`
- v-show, `<h1 v-show="ok">Hello!</h1>`
-  v-html, 变量转字符串转html, `<div v-html="message"></div>`
- 模板变量 {{var}} 变量转字符串，不改变html结构
- v-model `<input v-model="message">`  来实现双向数据绑定
- 过滤器 `{{ message | capitalize }}`
- 过滤器 `<div v-bind:id="rawId | formatId"></div>`
- 模板if  `{{#if ok}}  <h1>Yes</h1>{{/if}}`
- v-else `<div v-if="Math.random() > 0.5">Sorry</div> <div v-else> Not sorry</div>`
- v-else-if 在 2.1.0 新增

这些v指令，非常神奇，可以接字符串，该字符串语法类似js，也能包含html，属于介于js和html两者之间的私有语言。

#### v-for
v-for 遍历列表
``` html
<div id="app">
  <ol>
    <li v-for="site in sites">
      {{ site.name }}
    </li>
  </ol>
</div>
 
<script>
new Vue({
  el: '#app',
  data: {
    sites: [
      { name: 'foo' },
      { name: 'Google' },
      { name: 'Taobao' }
    ]
  }
})
</script>
```

#### v-for dict
v-for 遍历字典
``` html
<div id="app">
  <ul>
    <li v-for="(value, key) in object">
    {{ key }} : {{ value }}
    </li>
  </ul>
</div>
```
#### v-for range
v-for 也可以循环整数

``` html

<div id="app">
  <ul>
    <li v-for="n in 10">
     {{ n }}
    </li>
  </ul>
</div>
```
#### v-bind
实例中将 isActive 设置为 true 显示了一个绿色的 div 块，如果设置为 false 则不显示：

布尔型数据填充
```html

<div v-bind:class="{ 'active': isActive }"></div>
```

以上实例 div class 为：
``` html
<div class="active"></div>
```

#### v-bind style
字符串，整型数据填充

``` html
<div id="app">
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">菜鸟教程</div>
</div>
```

``` html
<div style="color: green; font-size: 30px;">教程</div>
```

#### v-on
除了直接绑定到一个方法，也可以用内联 JavaScript 语句：

``` html
<div id="app">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
 
<script>
new Vue({
  el: '#app',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
</script>
```
#### 事件修饰符
Vue.js 为 v-on 提供了事件修饰符来处理 DOM 事件细节，如：`event.preventDefault()` 或 `event.stopPropagation()`。

Vue.js 通过由点 . 表示的指令后缀来调用修饰符。

- .stop - 阻止冒泡
- .prevent - 阻止默认事件
- .capture - 阻止捕获
- .self - 只监听触发该元素的事件
- .once - 只触发一次
- .left - 左键事件
- .right - 右键事件
- .middle - 中间滚轮事件


#### 按键修饰符
Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：
``` html
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```
记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：
``` html
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```


### v-model
``` html
<div id="app">
  <p>input 元素：</p>
  <input v-model="message" placeholder="编辑我……">
  <p>消息是: {{ message }}</p>
    
  <p>textarea 元素：</p>
  <p style="white-space: pre">{{ message2 }}</p>
  <textarea v-model="message2" placeholder="多行文本输入……"></textarea>
</div>
 
<script>
new Vue({
  el: '#app',
  data: {
    message: 'foo',
    message2: '菜鸟教程\r\nhttp://www.foo.com'
  }
})
</script>
```

- 输入框
- 复选框
- 单选按钮
- 下拉列表


### 修饰符
#### .lazy
在默认情况下， v-model 在 input 事件中同步输入框的值与数据，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：
``` html
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >
```

#### .number
如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：
``` html
<input v-model.number="age" type="number">
```

这通常很有用，因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型。

.trim
如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：
``` html
<input v-model.trim="msg">
```

### 自定义指令
除了默认设置的核心指令( v-model 和 v-show ), Vue 也允许注册自定义指令。

自定义指令在js部分注册，在html部分使用。

#### 自定义指令的生命周期

自定义指令的生命周期都对应有触发函数（钩子函数）

指令定义函数提供了几个钩子函数（可选）：

bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。

inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。

update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。

componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。

unbind: 只调用一次， 指令与元素解绑时调用。


#### 核心机制

当一个 Vue 实例被创建时，它向 Vue 的响应式系统中加入了其 data 对象中能找到的所有的属性。当这些属性的值发生改变时，html 视图将也会产生相应的变化。

下面我们注册一个全局指令 v-focus, 该指令的功能是在页面加载时，元素获得焦点：

实例
``` html
<div id="app">
    <p>页面载入时，input 元素自动获取焦点：</p>
    <input v-focus>
</div>
 
<script>
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>
```



``` html
<div id='app'>
  <input type="text" v-model="inputValue" v-focus>
</div>
<script>
  Vue.directive('focus', {
    // 第一次绑定元素时调用
    bind () {
      console.log('bind')
    },
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      console.log('inserted')
      el.focus()
    },
    // 所在组件VNode发生更新时调用
    update () {
      console.log('update')
    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated () {
      console.log('componentUpdated')
    },
    // 只调用一次，指令与元素解绑时调用
    unbind () {
      console.log('unbind')
    }
  })
  new Vue({
    data: {
      inputValue: ''
    }
  }).$mount('#app')
</script>
```


## 组件系统

组件（Component）是 Vue.js 最强大的功能之一。

组件可以扩展 HTML 元素，封装可重用的代码。

组件系统让我们可以用独立可复用的小组件来构建大型应用，几乎任意类型的应用的界面都可以抽象为一个组件树：

#### 全局组件
注册一个全局组件语法格式如下：
`Vue.component(tagName, options)`

tagName 为组件名，options 为配置选项。注册后，我们可以使用以下方式来调用组件：
``` html
<tagName></tagName>
```

注册一个简单的全局组件 foo，并使用它：
``` html
<div id="app">
    <foo></foo>
</div>
 
<script>
// 注册
Vue.component('foo', {
  template: '<h1>自定义组件!</h1>'
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>
```

#### demo 2

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
#### 局部组件

我们也可以在实例选项中注册局部组件，这样组件只能在这个实例中使用：
``` html
<div id="app">
    <foo></foo>
</div>
 
<script>
var Child = {
  template: '<h1>自定义组件!</h1>'
}
 
// 创建根实例
new Vue({
  el: '#app',
  components: {
    // <foo> 将只在父模板可用
    'foo': Child
  }
})
</script>
```
新建一个局部组件，并且绑定到div。


#### Prop
prop 是子组件用来接受父组件传递过来的数据的一个自定义属性。

父组件的数据需要通过 props 把数据传给子组件，子组件需要显式地用 props 选项声明 "prop"：
``` html
<div id="app">
    <child message="hello!"></child>
</div>
 
<script>
// 注册
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 同样也可以在 vm 实例中像 "this.message" 这样使用
  template: '<span>{{ message }}</span>'
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>
```

可以看到，需要提供 message这个props来初始化组件。

#### 动态 Prop
类似于用 v-bind 绑定 HTML 特性到一个表达式，也可以用 v-bind 动态绑定 props 的值到父组件的数据中。每当父组件的数据变化时，该变化也会


``` html
<div id="app">
    <div>
      <input v-model="parentMsg">
      <br>
      <child v-bind:message="parentMsg"></child>
    </div>
</div>
 
<script>
// 注册
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 同样也可以在 vm 实例中像 "this.message" 这样使用
  template: '<span>{{ message }}</span>'
})
// 创建根实例
new Vue({
  el: '#app',
  data: {
    parentMsg: '父组件内容'
  }
})
</script>
```

注意: prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。
#### props vs data
props 和data的变化频率不同。

props在组件初始化时传入，之后不做更改。

data在组件初始化时传入，之后可以随时更改。

#### Vue.set
Vue.set 方法用于设置对象的属性，它可以解决 Vue 无法检测添加属性的限制

#### Vue.delete
Vue.delete 用于删除动态添加的属性


### vue文件
Vue自定义了一种后缀名名字为`.vue`文件,它将`html`, `js`, `css` 整合成一个文件,和里面 `template` `script` `style`三个区别分别依次对应。

``` html
<template>
<!--这里写 html -->
<template/>
<script>
  export default {};
  // 这里写js
</script>
<style lang = "less" scoped>
  <!--这里写css-->
</style>
```

- 一个`.vue` 文件就等于单独组件。因为`.vue`文件是自定义的，浏览器不识别，所以要对该文件进行解析,在webpack构建中，需要安装vue-loader 对.vue文件进行解析。
- `template`里面最外层必须是只有一个容器
- `script` 中的 `export default {}` 即导出这个组件，外部可以引用。
- `style` 中的 `lang` 指额外表示支持的语言可以让编辑器识别,`scoped` 指这里写的css只适用于该组件。


## third lib

#### axios
Vue.js 2.0 版本推荐使用 axios 来完成 ajax 请求。

Axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器和 node.js 中。

Github开源地址： https://github.com/axios/axios
#### Vue Router
vue-router

#### mixins

混入 (mixins)定义了一部分可复用的方法或者计算属性。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

来看一个简单的实例：

实例

``` js
var vm = new Vue({
    el: '#databinding',
    data: {
    },
    methods : {
    },
});
// 定义一个混入对象
var myMixin = {
    created: function () {
        this.startmixin()
    },
    methods: {
        startmixin: function () {
            document.write("欢迎来到混入实例");
        }
    }
};
var Component = Vue.extend({
    mixins: [myMixin]
})
var component = new Component();
```

## misc
### reference

[https://www.runoob.com/vue2/vue-tutorial.html](https://www.runoob.com/vue2/vue-tutorial.html)