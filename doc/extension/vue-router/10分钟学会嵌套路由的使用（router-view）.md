# 10分钟学会嵌套路由的使用（router-view）

[![img](https://p3-passport.byteimg.com/img/user-avatar/9612516141ada9f82b55ad6b2f1fb5c0~100x100.awebp)](https://juejin.cn/user/1292681406843214)

[coolFish![创作等级LV.4](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4453379f1d416ca00c3619e796d330~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp)](https://juejin.cn/user/1292681406843214)

2020年12月16日 22:41 · 阅读 13647

# 一篇搞定VUE嵌套路由使用（router-view）

### router-view介绍

- router-view是vue-router里的一小块知识点，但是很重要，很多tab栏切换都会用到，字面意思是路由视图，其实很贴切，通俗的说就是一块显示区域，你可以通过路由来控制他的显示内容，好处就是浏览器不会重载，非常适合SPA应用的开发
- 先看一个效果图

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df17e2ba60c04f2ead5782260dfd0741~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)img

### 使用详解：

- 首先下载vue-router，并且挂载，这里不细说，百度一堆
- 我们需要一个主页面，放置router-view，作为展示页面
- 然后需要几个子页面，放在主页面中的router-view展示

### 上代码

- 主页面：App.vue,

```xml
<template>
  <div id="app">
    <router-view></router-view>
   <router-link :to="{name:'H1'}">H1页面</router-link>
   <router-link :to="{name:'H2'}">H2页面</router-link>
  </div>
</template>
```

小结：这里是主页面，子页面要展示的内容都会在router-view标签内展示，router-link标签是操控router-view中显示页面的路由，：to就是点击展示的意思，这里可以展示name为H1,H2的三个路由名称对应的页面

- 默认展示页面

```xml
<template>
  <div class="hello">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <router-view></router-view>
    <div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
```

这个页面我们作为默认展示页面，这个页面会被展示再App.vue的router-view里面，我们的子页面会展示再这个页面的router-view里面

- 点击展示的H1,H2

```javascript
//h1
<template>
    <div class="hellow">
        <h1>{{msg}}</h1>
    </div>
</template>
<script>
export default {
  data() {
    return {
      msg:'我是h1'
    }
  },
}
</script>
//h2
<template>
    <div class="hellow">
      	<h1>{{msg}}</h1>
    </div>
</template>
<script>
export default {
  data() {
    return {
      msg:'我是h2'
    }
  },
}
</script>
```

小结：这就是两个普通的展示页面，对等于你项目中要展示的内容

### 超级重点，配置路由文件

```css
 routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[{
        path:'h1',
        name:'H1',
        component:H1
      },{
        path:'h2',
        name:'H2',
        component:H2
      },
    ]
    }
  ]
```

小结：首先当路径为/时候，展示我们的默认展示页面Helloworld，然后这里注意了，这里写了一个children，说明这里面的的都是Helloworld页面的子路由，这些页面将来会展示在HelloWorld页面中的router-view中，所以一个页面中的router-view是用来展示这个页面路由下面的子路由的，

### 总结：

嵌套路由整体来说分为几个核心：

- 路由配置页面，设置默认路由，然后你想在哪个页面写嵌套路由，就在这个路由中写子路由

- 子路由跳转及其展示，router-link，帮助我们操作要在router-view中展示的子路由页面

  如果还有不懂的地方，可以私信留言，不足的地方欢迎指出，谢谢大家

分类：

[前端](https://juejin.cn/frontend)

标签：

[Vue.js](https://juejin.cn/tag/Vue.js)