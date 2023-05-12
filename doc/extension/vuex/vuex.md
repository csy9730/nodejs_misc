# vuex

### vuex

- state 对应状态，名词
- mutation  更改状态
- getters 动词 获取并更改状态，懒惰求值
- actions 动词 异步求值，支持axios


getTodo 流程： 调用 apijs的 axios 函数，发给 EDITTODE 函数，


要修改vuex中的数据,就要使用mutations去修改

在任意组件中，通过this.$store.state.属性名 来获取公共数据。

在模块中,则可以直接省略this而直接写成：`{{$store.state.属性名}}`
