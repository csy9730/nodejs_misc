# [vuex的commit、payload、actions、setter、mutations等方法案例](https://www.cnblogs.com/xuyx/p/11951259.html)

**创建仓库即4步走：**

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
// 创建一个仓库，并且存放一些全局数据（四大选项）
const store = new Vuex.Store({
    // 全局数据
    state: {
        todos: []  
    },
    // 同步函数
    mutations: {
        GETALL(state, payload){
            // state.todos.push(...payload)
            state.todos = payload
        },
        DEL(state, payload){
            // 根据id删除state的数据
            state.todos = state.todos.filter(item=>item.id != payload.id)
        },
        ADD(state, payload) {
            console.log(payload)
            // 插入到数组中
            state.todos.push(payload)
        },
        CHANGE(state, payload){
            state.todos.map(item=>{
               return item.id == payload.id ? payload : item
            })
        }
    },
    // 异步函数
    actions: {
        async GETALL({commit}, payload){
            // 请求接口中的数据，然后存储道state的todos中
            var data = await fetch("http://127.0.0.1:3000/mapList").then(data=>data.json())
            // 发出commit命令，并且将数据当作载荷传递过去
            commit('GETALL', data)
        },
        async DEL({ commit }, payload) {
            // 向API接口发出删除请求，删除本地db.json中的数据
            await fetch("http://127.0.0.1:3000/mapList/" + payload.id, {
                method: 'DELETE'
            })

            // 删除全局state仓库的数据，影响视图更新
            commit('DEL', payload)
        },
        async ADD({ commit }, payload) {
            var data = await fetch("http://127.0.0.1:3000/mapList", {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(payload)   //只能提交字符串类型的JSON
            }).then(data => data.json())

            // 新增数据到state中，影响视图更新
            commit("ADD", data)
        },
        async CHANGE({ commit }, payload){
            var data = await fetch("http://127.0.0.1:3000/mapList/" + payload.id, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(payload)   //只能提交字符串类型的JSON
            }).then(data => data.json())

            // 虽然实现了修改，视图也更新了，但为了可预测状态的完整性，还是写上
            commit('CHANGE', data);
        }
    },
    // 计算属性
    getters: {
        yizuo(state, getters){
            return state.todos.filter(item=>item.done) //返回已做的
        },
        weizuo(state, getters){
            return state.todos.filter(item => !item.done)  //返回未做的
        }
    },
    plugins: [
        createLogger()
    ]
})
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

**vue组件中的代码：**

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<template>
    <div>
        <div>
            <el-input v-model="txt" placeholder="请输入内容" class="add"></el-input>
            <el-button type="primary" @click="add" icon="el-icon-circle-plus">增加</el-button>
        </div>

        <ul>
            <li is="TodoLi" v-for="item in todos" :item="item"></li>
        </ul>

        <p>
            全部：{{$store.state.todos.length}}个代办事项--
            已做：{{$store.getters.yizuo.length}}个完成事项--
            未做：{{$store.getters.weizuo.length}}个代办事项
        </p>
        
        <el-button type="primary" @click="all">查看全部</el-button>
        <el-button type="primary" @click="yizuo">查看已做</el-button>
        <el-button type="primary" @click="weizuo">查看未做</el-button>
    </div>
</template>

<script>
    import TodoLi from "./components/TodoLi.vue"
    export default {
        created(){
            // 发出一个异步命令，触发actions
            this.$store.dispatch('GETALL')
        },
        data(){
            return {
                txt: '',
                state: 'all'
            }
        },
        computed: {
            todos(){
                if(this.state == 'all'){
                    return this.$store.state.todos
                }else if(this.state == 'yizuo'){
                    return this.$store.getters.yizuo
                }else if(this.state == 'weizuo'){
                    return this.$store.getters.weizuo
                }
            }
        },
        methods: {
            add(){
                if(this.txt == '') return;

                // 内容不为空，则发出新增的异步请求命令
                this.$store.dispatch('ADD', {id: new Date()-0, title: this.txt, done: false})
                this.txt = ''
            },
            all(){
                this.state = 'all'
            },
            weizuo(){
                this.state = 'weizuo'
            },
            yizuo(){
                this.state = 'yizuo'
            }
        },
        components: {
            TodoLi
        }
    }
</script>

<style scoped>
    ul{margin: 0;padding: 0;}
    .add{
        width: 300px;
    }
</style>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

**vue commit发生异步(dispatch)等**

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<template>
    <li>
        <el-checkbox v-model="item.done" @change="changeDone(item)"/>
        <span v-if="!isShow" class="title" @dblclick="showInput" :class="{cur: item.done}">
            {{item.title}}
        </span>
        <el-input v-if="isShow" v-model="item.title" autofocus @change="hideInput(item)">
        </el-input>
        <el-button type="danger" icon="el-icon-delete" circle class="btn" @click="del(item.id)">
        </el-button>
    </li>
</template>

<script>
    export default {
        props: ['item'],
        data(){
            return {
                isShow: false
            }
        },
        methods: {
            del(id){
                this.$store.dispatch('DEL', { id })
            },
            showInput(){
                // 双击显示input
                this.isShow = true
            },
            hideInput(item){
                // 失去焦点隐藏input，并且发送命令修改title
                this.isShow = false;
                this.$store.dispatch('CHANGE', item)
            },
            changeDone(item){
                this.$store.dispatch('CHANGE', item)
            }
        },
        // directives: {
        //     // 自定义组件指令，自动得到焦点
        //     focus: {
        //         inserted(el){
        //             el.focus()
        //         }
        //     }
        // }
    }
</script>

<style scoped>
    li{
        list-style:none;
        width: 400px;
        height: 40px;
        padding-left:10px;
        line-height: 40px;
        margin-top:10px;
        border-bottom: 1px solid #eee;
    }
    .el-checkbox{float: left;}
    .title{
        /* float: left; */
        width: 80%;
        font-family: "Helvetica Neue","PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        display: inline-block;
    }
    .el-input{float: left;width: 200px;}
    .btn{float: right;}
    .btn button{float: left;}
    .cur{color:#ccc;}
</style>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

转载请说明！

标签: [actions](https://www.cnblogs.com/xuyx/tag/actions/) , [getters](https://www.cnblogs.com/xuyx/tag/getters/) , [payload](https://www.cnblogs.com/xuyx/tag/payload/) , [commit](https://www.cnblogs.com/xuyx/tag/commit/) , [dispatch](https://www.cnblogs.com/xuyx/tag/dispatch/) , [vuex](https://www.cnblogs.com/xuyx/tag/vuex/) , [mutations](https://www.cnblogs.com/xuyx/tag/mutations/)