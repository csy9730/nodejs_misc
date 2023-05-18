
# vuex

### store

- state 对应状态，对象
	- 在任意组件中，通过`this.$store.state.field_name` 来获取公共数据。
	- 在模块中,则可以直接省略this而直接写成：`{{$store.state.field_name}}`
- getters 外部接口 从本地获取状态，监视状态，懒惰求值
	- `$store.getters.state_name `
	- getter定义的时候,第一个参数是state,不能传第二个参数,派生的值通过return返回，无副作用？
- mutation  更改状态内部接口, 更改本地数据，只能使用mutations去通知组件状态修改
	- 参数是state，参数2是payload，函数无返回值
	- 常见定义 `set_mutaname(state, newval) {state.num = newval}`
	- `$store.commit('set_mutaname', 200)`
	- 不推荐 `this.$store.state.mutaname = 200`
- actions 外部接口，支持axios访问服务器数据，远程获取数据或更改远程数据
	- 参数是context，参数2是payload，函数无返回值
	- 在组件中通过`this.$store.dispatch('actions的名字', 参数)`来调用action
	- actions流程中： 调用 axios 函数，发生数据变更时，可以调用 对应的mutation 函数更改本地状态
- 用modules来拆分复杂业务


#### actions
```javascript
// 发ajax请求，从后端获取数据，再来去修改state中的数据
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

#### demo2
```javascript
//main.js
const store = new Vuex.Store({
  state:{
    products: [
      {name: '鼠标', price: 20},
      {name: '键盘', price: 40},
      {name: '耳机', price: 60},
      {name: '显示屏', price: 80}
    ]
  },
  getters:{
    saleProducts: (state) => {
      let saleProducts = state.products.map( product => {
        return {
          name: product.name,
          price: product.price / 2
        }
      })
      return saleProducts;
    }
  },
  mutations:{
    minusPrice (state, payload ) {
      let newPrice = state.products.forEach( product => {
        product.price -= payload
      })
    }
  },
  actions:{ //添加actions
    minusPriceAsync( context, payload ) {
      setTimeout( () => {
        context.commit( 'minusPrice', payload ); //context提交
      }, 2000)
    }
  }
})
```