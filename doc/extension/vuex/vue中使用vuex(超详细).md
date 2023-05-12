# vue中使用vuex(超详细)

[![img](https://p3-passport.byteimg.com/img/user-avatar/600852aa47d5f261d168873a7440197d~100x100.awebp)](https://juejin.cn/user/3545242100302920)

[佑子呀![创作等级LV.4](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4453379f1d416ca00c3619e796d330~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp)![VIP.5 如鱼得水](https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/162b40efbd71af9a806dd2b54c4580ef.svg)](https://juejin.cn/user/3545242100302920)

2021年09月29日 20:06 · 阅读 15857

![vue中使用vuex(超详细)](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63fa8fec73104cb0ae1505b04b29412a~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?)

在vue中,我们想要实现父子组件中的传值,通过props和自定义事件可以可轻松的办到,如果是两个没有关联的组件,通过$bus事件公交也能实现兄弟子件的传值,但是在大型项目中,使用$bus容易导致代码繁琐,且不容易阅读.这个时候,vuex的出现可以很好的帮助我们解决我们这种问题

## vuex的概念

vuex是一个专为 Vue.js 应用程序开发的**状态管理模式**， 采用**集中式存储**管理应用的所有组件的状态，解决多组件数据通信。(简单来说就是管理数据的,相当于一个仓库,里面存放着各种需要共享的数据,所有组件都可以拿到里面的数据)

要点:

1.vue官方搭配,专属,有专门的调试工具

2.数据变化是可预测的(响应式)

3.**集中式**管理数据状态方案

![vue11.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa98f16ce41a4e04b3fc19982a3c307d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## vuex的学习内容

1.state 统一定义管理公共数据

2.mutations: 使用它来修改数据

3.getters: 类似于vue中的计算属性

4.actions: 类似于methods,用于发起异步请求,比如axios

5.modules: 模块拆分

其中最重要的内容为**state**和**mutations**

```javascript
javascript复制代码import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: { // 存放数据 和data类似
  },
  mutations: { // 用来修改state和getters里面的数据
  },
  getters: { // 相当于计算属性
  },
  actions: { // vuex中用于发起异步请求
  },
  modules: {// 拆分模块
  }
})
```

## vuex的使用

1. 情况1：在老项目中使用。 先额外安装vuex包，然后在配置。
2. 情况2：在新项目中使用。 在配置vue-cli中创建项目时，就可以直接选中vuex项，这样就不用做任何配置了（脚手架会自动帮我们完成的

在这里我们简单说下情况1的时候,如何使用vuex

## 在旧项目中使用vuex

1.安装

```css
css
复制代码npm i vuex
```

2.实例化store

新建store文件夹,在该文件夹下建index.js文件

```javascript
javascript复制代码import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  }
})
export default store
```

3.在vue实例中,注入store

```javascript
javascript复制代码// 省略其他
// 1. 导入store
import store from './store' 

new Vue({
  // 省略其他...
  store // 2. 注入Vue实例
})
```

## 在组件中使用store

在任意组件中，通过`this.$store.state.属性名` 来获取公共数据。

在模块中,则可以直接省略this而直接写成：`{{$store.state.属性名}}`

![使用store.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b16969670e774a5dab490c03b9899984~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 在组件中修改state使用mutations

通过`this.$store.commit('mutation事件名',mapper参数)`可以修改state里面的数据

注意点

1. 要修改vuex中的数据,就要使用mutations去修改
2. 在methods里面$store.state.xxx = xxx这种方式虽然可以直接修改数据,但是vue不推荐,并且在严格模式下通过这种方式修改数据,会直接报错

```php
php复制代码export default new Vuex.Store({
  state: {
    num: 100,
    userinfo: {
      name:'柚子'
    },
    
  },
  mutations: {
    setname(state, newval) {
      state.num = newval
    },
  }
javascript复制代码methods: {
    btn() {
      this.$store.state.num = 200 //不推荐这种写法,vuex所有修改数据都要写在mutations里
    },
    btnmutation() {
      this.$store.commit('setbooks',200) // 点击按钮 然后通过commit触发mutation事件
    },
```

## vuex中用getters的派生状态

作用:在state中的数据的基础上，进一步对数据进行加工得到新数据。(与组件中computed一样)

在vuex中配置getters

```javascript
javascript复制代码new Vuex.store({
  // 省略其他...
  getters: {
    // state 就是上边定义的公共数据state
    getter的名字1: function(state) {
      return 要返回的值
    }
  }
})
```

在组件中用`this.$store.getters.xxx`来获取getters派生后的的值

注意: getter定义的时候,第一个参数是state,不能传第二个参数,派生的值通过return返回

## Vuex-state-mutation-getters 小结

vuex中维护公共数据主要有两个要点

1.定义数据

2.提供获取/修改数据的方法

![vuex两个核心小结.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b37b53e6316f49c19cd9cffbe6b45fcd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## vuex中发起异步请求

前面我们已经讲过了修改数据和定义数据,那当我们想要从服务器发起请求拿数据的时候,就不可避免的要发起异步请求来获取数据,这个时候actions就可以很好的帮助我们,它可以包含任意异步请求的操作.

定义格式:

```javascript
javascript复制代码new Vuex.store({
  // 省略其他...
  actions: {
    // context对象会自动传入，它与store实例具有相同的方法和属性
    action的名字: function(context, 载荷) {
      // 1. 发异步请求, 请求数据
      
      // 2. commit调用mutation来修改/保存数据
      
      // context.commit('mutation名', 载荷)
    }
  }
})
```

我们可以使用Action来修改state，这一点是类似于 mutation的，不同在于：

- action中可以通过调用 mutation来修改state，而不是直接变更状态。
- action 可以包含**任意异步**(例如ajax请求)操作。

调用格式

- 在组件中通过`this.$store.dispatch('actions的名字', 参数)`来调用action

```javascript
javascript复制代码// 发ajax请求，从后端获取数据，再来去修改state中的数据
    actions: {
      getBooks (context, params) {
        console.log('getbooks的查询参数是', params)
        axios({
          url: 'https://www.fastmock.site/mock/37d3b9f13a48d528a9339fbed1b81bd5/book/api/books',
          method: 'GET'
        }).then(res => {
          console.log(res)
          context.commit('setBooks', res.data.data)
        })
      }
    },
```

小结

将ajax请求放在actions中有两个好处：

1. 代码得到了进一步封装。将发ajax和保存数据到vuex绑定在一起。
2. 逻辑更通顺。如果数据需要保存在Vuex的state中，那从接口处获取数据的操作就定义在Vuex的actions中。

![vuex发异步请求流程图.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89799a481be842b6854a3dede10e0f12~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## Vuex-用modules来拆分复杂业务

### 问题导入

随着项目越来越大，需要放在vuex中的数据越来越多，整个store/index.js中代码会越来越长，怎么办呢？

### modules的作用

拆分模板，把复杂的场景按模块来拆开

```php
php复制代码export default new Vuex.Store({
  // state: 用来保存所有的公共数据
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
  	模块名1： {
    		// namespaced为true，则在使用mutations时，就必须要加上模块名
      	namespaced: true, 
  		  state: {},
  			getters: {},
  			mutations: {},
  			actions: {},
  			modules: {}
  	}，
    模块名2： {
        // namespaced不写，默认为false，则在使用mutations时，不需要加模块名
  		  state: {},
  			getters: {},
  			mutations: {},
  			actions: {},
         modules: {}
  	}  
  }
})
```

也可以进一步对文件进行拆分

```lua
lua复制代码|--store /
|------- index.js # 引入模块
|------- modules
|-------------- / mod1.js # 模块1
|-------------- / mod2.js # 模块2
```

### 访问数据和修改数据的调整

- 访问模块中的数据，要加上模块名

```bash
bash复制代码获取数据项：  {{$store.state.模块名.数据项名}}
获取getters： {{$store.getters['模块名/getters名']}}
```

访问模块中的mutations/actions:

- 如果namespaced为true，则需要额外去补充模块名
- 如果namespaced为false，则不需要额外补充模块名

```bash
bash复制代码$store.commit('mutations名')        // namespaced为false
$store.commit('模块名/mutations名')  // namespaced为true
```

### 小结

使用了modules之后，在访问数据时就要额外添加modules的名字了。

结论： 在使用modules时，建议都给加上namespaced!

## Vuex-辅助函数mapState来使用公共数据

有的时候,当访问某个数据项嵌套太深了，用$store访问数据太麻烦,并且不方便修改和阅读,我们能不能优化一下代码的格式? 这个时候 map辅助函数可以很好的帮我们做这件事

- 当然,不用map函数我们也可以完全使用vuex,这只是一个拔尖的过程,可了解或不阅读,对使用vuex也无关紧要

用mapState把公共数据（vuex.store） 映射 到本组件内部的**计算属性**中

### mapState的使用步骤

#### 映射

```javascript
javascript复制代码// 1. 导入辅助函数mapState，它是在vuex中定义的一个工具函数。
//  es6 按需导入 import { mapState } from 'vuex' 
import { mapState } from 'vuex'

computed: {
   // 说明1： ...对象 是把对象展开，合并到computed
   // 说明2： mapState是一个函数 
   //  ['数据项1'， '数据项2']
   ...mapState(['xxx'])，
   ...mapState({'新名字': 'xxx'})
}
```

示例

```javascript
javascript复制代码// 步骤
// 1. 导入辅助函数mapState，它是在vuex中定义的一个工具函数。
//  es6 按需导入 import { mapState } from 'vuex' 
import { mapState } from 'vuex'

// 2. 在computed中使用 ...mapState(['books'])
// const res = mapState(['books'])
// res的结果是一个对象： { books: function() {}}
// console.log('mapState', res)

export default {
  computed: {
    c1 () {
      return 'c1'
    },
    // books: function() {}
    // ..res： 把res这个对象合并到computed对象中
    // ...res
    ...mapState(['books'])
  }
}
</script>
```

### 小结

1. mapState是辅助函数，将vuex中的数据投射到组件内部；
2. computed:{ ...mapState() } 这里的...是对象的展开运算符，整体来看是对象的合并。

## Vuex-辅助函数mapState对数据重命名

掌握mapState对数据重命名的用法。

### 场景

vuex中的数据与本组件内的数据名相同,我们可以使用`...mapState({'新名字': 'xxx'})`对数据重命名

## Vuex-map函数用法汇总

### 如何使用全局state

- 直接使用： this.$store.state.xxx;

- map辅助函数：

  ```css
  css复制代码computed: { 
    ...mapState(['xxx']), 
    ...mapState({'新名字': 'xxx'})
  }
  ```

### 如何使用modules中的state

- 直接使用： this.$store.state.模块名.xxx;

- map辅助函数：

  ```arduino
  arduino复制代码computed: { 
    ...mapState('模块名', ['xxx']), 
    ...mapState('模块名', {'新名字': 'xxx'})
  }
  ```

### 如何使用全局getters

- 直接使用：`this.$store.getters.xxx`

- map辅助函数：

  ```css
  css复制代码computed: { 
    ...mapGetters(['xxx']), 
    ...mapGetters({'新名字': 'xxx'})
  }
  ```

### 如何使用modules中的getters

- 直接使用： `this.$store.getters.模块名.xxx`

- map辅助函数：

  ```arduino
  arduino复制代码computed: { 
    ...mapGetters('模块名', ['xxx']), 
    ...mapGetters('模块名',{'新名字': 'xxx'})
  }
  ```

### 如何使用全局mutations

- 直接使用：`this.$store.commit('mutation名', 参数)`

- map辅助函数：

  ```css
  css复制代码methods: { 
    ...mapMutations(['mutation名']), 
    ...mapMutations({'新名字': 'mutation名'})
  }
  ```

### 如何使用modules中的mutations（namespaced:true）

- 直接使用： `this.$store.commit('模块名/mutation名', 参数)`

- map辅助函数：

  ```matlab
  matlab复制代码methods: { 
    ...mapMutations('模块名', ['xxx']), 
    ...mapMutations('模块名',{'新名字': 'xxx'})
  }
  ```

### 如何使用全局actions

- 直接使用：`this.$store.dispatch('action名', 参数)`

- map辅助函数：

  ```css
  css复制代码methods: { 
    ...mapActions(['actions名']), 
    ...mapActions({'新名字': 'actions名'})
  }
  ```

### 如何使用modules中的actions（namespaced:true）

- 直接使用： `this.$store.dispatch('模块名/action名', 参数)`

- map辅助函数：

  ```matlab
  matlab复制代码methods: { 
    ...mapActions('模块名', ['xxx']), 
    ...mapActions('模块名',{'新名字': 'xxx'})
  }
  ```

核心api小结

![vuex核心api小结.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a07a016386d043bbb6edab40aebdcf98~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

结语:

vuex总体来说,还是非常容易上手的,只要稍微写写,基本就能掌握了,上面如果有什么错误的,欢迎大家指正,虚心求教,一起进步

分类：

[前端](https://juejin.cn/frontend)

标签：

[Vue.js](https://juejin.cn/tag/Vue.js)