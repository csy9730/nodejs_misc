## [路由 router-view](https://www.cnblogs.com/bydzhangxiaowei/p/9055484.html)

路由，其实就是指向的意思，当我点击页面上的home按钮时，页面中就要显示home的内容，如果点击页面上的about 按钮，页面中就要显示about 的内容。

Home按钮 => home 内容， about按钮 => about 内容，也可以说是一种映射. 所以在页面上有两个部分，一个是点击部分，一个是点击之后，显示内容的部分。点击之后，怎么做到正确的对应，比如，我点击home 按钮，页面中怎么就正好能显示home的内容。这就要在js 文件中配置路由。路由中有三个基本的概念 route, routes, router。

1， route，它是一条路由，由这个英文单词也可以看出来，它是单数， Home按钮 => home内容， 这是一条route, about按钮 => about 内容， 这是另一条路由。

2， routes 是一组路由，把上面的每一条路由组合起来，形成一个数组。[{home 按钮 =>home内容 }， { about按钮 => about 内容}]

3， router 是一个机制，相当于一个管理者，它来管理路由。因为routes 只是定义了一组路由，它放在哪里是静止的，当真正来了请求，怎么办？ 就是当用户点击home 按钮的时候，怎么办？这时router 就起作用了，它到routes 中去查找，去找到对应的 home 内容，所以页面中就显示了 home 内容。

4，客户端中的路由，实际上就是dom 元素的显示和隐藏。当页面中显示home 内容的时候，about 中的内容全部隐藏，反之也是一样。客户端路由有两种实现方式：基于hash 和基于html5 history api.vue-router中的路由也是基于上面的内容来实现的在vue中实现路由还是相对简单的。因为我们页面中所有内容都是组件化的，我们只要把路径和组件对应起来就可以了，然后在页面中把组件渲染出来。

1， 页面实现（html模版中）在vue-router中, 我们看到它定义了两个标签<router-link> 和<router-view>来对应点击和显示部分。<router-link> 就是定义页面中点击的部分，<router-view> 定义显示部分，就是点击后，区配的内容显示在什么地方。所以 <router-link> 还有一个非常重要的属性 to，定义点击之后，要到哪里去， 如：<router-link to="/home">Home</router-link>

2， js 中配置路由首先要定义route, 一条路由的实现。它是一个对象，由两个部分组成： path和component. path 指路径，component 指的是组件。如：{path:’/home’, component: home}我们这里有两条路由，组成一个routes:

``` js
const routes = [{ path: '/home', component: Home },
                { path: '/about', component: About }]
```





最后创建router 对路由进行管理，它是由构造函数 new vueRouter() 创建，接受routes 参数。

``` js
const router = new VueRouter({
    routes // routes: routes 的简写
})
```



配置完成后，把router 实例注入到 vue 根实例中,就可以使用路由了`const app = new Vue({router}).$mount('#app')`执行过程：当用户点击 router-link 标签时，会去寻找它的 to 属性， 它的 to 属性和 js中配置的路径`{ path: '/home', component: Home} `path 一一对应，从而找到了匹配的组件， 最后把组件渲染到<router-view> 标签所在的地方。所有的这些实现才是基于hash 实现的。vue-cli 创建一个项目体验一下, 当然不要忘记安装vue-router1, 在src 目录下新建两个组件，home.vue 和 about.vue



```html
<template>
    <div>
        <h1>home</h1>
        <p>{{msg}}</p>
    </div>
</template>
<script>
    export default {data () {return {msg: "我是home 组件"}}}   
</script>

```



about.vue

``` html
<template>
    <div>
        <h1>about</h1>
        <p>{{aboutMsg}}</p>
    </div>
</template>
<script>
    export default {data () {return {aboutMsg: '我是about组件'}}}
</script>
```



2, 在 App.vue中 定义<router-link > 和 </router-view>



3, 在 src目录下再新建一个router.js 定义router, 就是定义 路径到 组件的 映射。

``` js
import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import home from "./home.vue";
import about from "./about.vue";// 要告诉 vue 使用 vueRouter

Vue.use(VueRouter);
const routes = [
    {path:"/home",component: home},
    {path: "/about",component: about}]
var router = new VueRouter({routes})
export default router;
```



4， 把路由注入到根实例中，启动路由。这里其实还有一种方法，就像vuex store 注入到根实例中一样，我们也可以把vueRouter 直接注入到根实例中。在main.js中引入路由，注入到根实例中。

``` js
import Vue from 'vue'
import App from './App.vue'// 引入路由
import router from "./router.js"
new Vue({el: '#app',router, // 注入到根实例中
         render: h => h(App)})
```





5， 这时点击页面上的home 和about 可以看到组件来回切换。但是有一个问题，当首次进入页面的时候，页面中并没有显示任何内容。这是因为首次进入页面时，它的路径是 '/'，我们并没有给这个路径做相应的配置。一般，页面一加载进来都会显示home页面，我们也要把这个路径指向home组件。但是如果我们写`{ path: '/', component: Home }`,vue 会报错，因为两条路径却指向同一个方向。这怎么办？这需要重定向，所谓重定向，就是重新给它指定一个方向，它本来是访问 / 路径，我们重新指向‘/home’, 它就相当于访问 '/home', 相应地, home组件就会显示到页面上。vueRouter中用 redirect 来定义重定向。