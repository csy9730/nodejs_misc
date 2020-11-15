# js


var 是 lazy evaluation / let 是eager evalation  

object的(.) 和[]都可以访问属性， 其中"."是静态访问（脚本时确定属性名）， 【】是动态访问（先执行表达式确定属性名再访问属性值），所以【】支持特殊关键字/保留字。


即时值，包括 1，2这种数据类型，字符串类型，null等，只能作为右值，
即时值和object有区别， wrapped object

短路运算符：&&

js的类型判断非常混乱，让人头大。例如：nan ，undefined，null，

## base

保留字不能作为变量名




### token
保留字不能作为变量名

eval
### expression

### statement
new /初始化对象
函数定义
函数调用
属性访问/赋值

## var
var 定义变量，会前置定义

delete 不能删除var定义的全局变量

scope 分为 全局域和函数域两种。

with 可以挂载变量，改变变量的作用域

const
let


解构赋值
``` js
let [x,y] = [1,2]
[x,y] = [x+1, y+1]
[x,y] =[y,x]

```
## program
try

goto/label/break/continue
## object

### enumeratable

``` js
for (var k in o){

}
```

for each
new
### meta
object.prototype
管理getter和setter
``` js
Object.toString()
Object.toLocalString()
Object.toJSON()
Object.valueOf()
Object.defineProperty()
Object.create()
seal()
freeze()
```

## array

``` js
map
filter
forEach
every
some 

slice
splice
push
pop
indexOf
lastIndexOf()
```

## function

``` javascript
var f= function(x){ return x*x;}

// 定义匿名函数并立即执行
var tensquared = (function(x){return x*x;}(10)); 
```

callable object
### define
通过var定义函数，只会前置变量名，不能前置匿名函数。
也可以使用 Function 定义函数，此时行为类似 eval。
### return
没有 return语句，默认返回 undefined

### method
通过引入this，使方法和对象分离，this对应一个scope，也引申出了闭包。
context ？
全局函数默认的this指向全局对象。

``` js
var calculator = {
    oper: 1,
    oper2: 2,
    add: function(){
        this.result = this.oper + this.oper2;
    }
}

calculator.add();

```

嵌套函数中，内层函数不会自动获得外层函数的this。需要显式引入this

```js
var o = {
    m: function(){
        var self = this;
        console.log(this==9);
        f();
        function f(){
            console.log( this === o); // ==> false
            console.log(self === o); // ==> true
        }
    }
}

o.m();
```
### arguments

``` js
function max( /* ... */){
    var max = Number.NEGATIVE_INFINITY;
    for (var i=0; i< arguments.length; i++){
        if (arguments[i[] > max) 
            max = arguments[i];
    }
    return max;
}

```


``` js

function f(x){
    console.log(x);
    arguments[0] =null;
    console.log(x);
}
var a = 1;
f(a);
```
#### callee&caller
``` js
var factorial = function (x){
    if (x<=1) return 1;
    return x* arguments.callee(x-1);
};
```

#### function namespace
立即执行匿名函数：
无返回量：可以提供局部名字空间。
如果返回函数（并且立即执行匿名函数内定义var变量）：可以提供闭包。

### 闭包
函数的定义域和调用域不一致时，容易混淆。

闭包的使用包括： 闭包生成函数，闭包函数，调用环境。闭包生成函数类似工厂函数，闭包函数类似构造函数。
注意： 闭包函数也能返回函数或对象。
闭包和对象的功能类似，都能提供实例级别的属性变量：类成员变量/闭包变量。
区别在于:
* 对象是以对象为载体，闭包是以函数为载体，两个访问方式有区别
* 对象的变量是成员变量，this指向这个变量域。
* 闭包的变量是上下文变量，对应整个函数域变量。

函数域变量区别于对象属性变量，可以提供不一样的扩展能力。
```


```

## class

instanceof 
工厂函数/构造函数
构造函数必须首字母大写。
## module
* imports
* exports
* require
* provide

对于模块的接口，可以封装成字典，然后用new构造函数返回或立即执行匿名函数返回。
### 立即执行匿名函数返回模块
立即执行匿名函数返回
``` js
var collections;
if (!collections) collections = { };
collections.sets = (function namespace()
{
    return {
        AbstractSet: AbstractSet,
        /* ... */
        NotSet: NotSet
    }
}())

```
### 立即执行匿名函数返回模块
``` js
var collections;
if (!collections) collections = { };
collections.sets = (new function namespace()
{
    this.AbstractSet = AbstractSet
        /* ... */
    this.NotSet = NotSet
    }
}())

```

##  misc
### regExp

``` js
var pattern = /s$/;
var pattern2 = new RegExp ("s$");

```
### 迭代器
### 生成器
生成器函数，生成器对象
### 数组生成式
document/window
### 函数简写

### rhino
### node
#### fs
process
stream

## client
### window
window.location
window.open()
window.prompt()
onload()
### document
``` js
var ts = document.getElementById("timestamp");
```
### element
### html
js脚本 可以以下形式存在于html中：
* 内联在 script中
* 外链在 src中
* 内嵌在 html中
* 放在url中。

主流推荐外链使用js脚本。
#### url
``` js
<a href="javascript:alert (new Date().toLocaleTimeString());"> check time</a>
```

``` js
<a href="javascript:void window.open('about:blank');"> </a>
```
## 
native function
host function
user defined function


Object.values()
Object.getOwnPropertyNames()

