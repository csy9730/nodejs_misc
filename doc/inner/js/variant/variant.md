# variant

### datatype

* number  
* string   
* boolean   
* null
* undefined   
* array  
* object
* function


#### typeof
使用typeof 可以判断类型
``` js
typeof  "a string"  
typeof([]])
// typeof 无法区分对象，数组和null

var   gettype=Object.prototype.toString
gettype.call('aaaa')        // 输出     [object String]
gettype.call(2222)          // 输出     [object Number]
gettype.call(true)          // 输出     [object Boolean]
gettype.call(undefined)     // 输出     [object Undefined]
gettype.call(null)          // 输出     [object Null]
gettype.call({})            // 输出     [object Object]
gettype.call([])            // 输出     [object Array]
gettype.call(function(){})  // 输出     [object Function]

[].constructor==Array // true
```
#### number

``` js
var x=100  
var a = x.toString()  

parseInt("abc") // Returns NaN.
parseInt("12abc") // Returns 12.
parseInt("12") //Return 12. 

if (isNaN(parseInt(x))) {
    alert("非数字");
} else{
    alert("数字");
}

var n = 123456.789; 
n.toPrecision(4); // "1.235e+5" 

Math.floor(5/2)  // c.向下取整 
```

#### 字符串
``` js
var path = "abc/def/ghi"
var sa = path.split("/")
var img= {
	"name": sa[sa.length-1],
	"path": path
}
console.log(img.path);



//去左右空格;
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}
```

``` js
ch = charAt(index) //  单字符  等同于 [index]
str = substr(pos,length) // 截取字符串
index = indexOf(str)
lastIndexOf
match
replace
str_new = slice(pos,pos2) // 字符串片段
str_arr = split(' ')
```

需要注意的是，JavaScript 的字符串是不可变的（immutable），String 类定义的方法都不能改变字符串的内容。像 String.toUpperCase() 这样的方法，返回的是全新的字符串，而不是修改原始字符串。

#### array

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


``` js
var arr = new Array("js","JavaScript","jQuery");
var end = arr[arr.length-1]
console.log(end);//jQuery

arr3 =[{"a":4,"b":5},{"a":5,"e":6},{"a":3,"r":8}]
arrSt = arr3.sort(function(first, second) {  return first["a"] - second["a"];});

// [ { a: 3, r: 8 }, { a: 4, b: 5 }, { a: 5, e: 6 } ]

```


* push
* pop
* slice(a,b) 返回片段


数组清空
1. ary.splice(0,ary.length); 
2. length赋值为0
3. 赋值为[]


``` js
// 数组查找值，返回索引
function isInArray(arr,value){
    if(arr.indexOf&&typeof(arr.indexOf)=='function'){
        var index = arr.indexOf(value);
        if(index >= 0){
            return true;
        }
    }
    return false;
}

var a=["sf_10.png","sf_9.png"]
var a2=["sf_10.jpg","sf_9.jpg"]

// 取交集
var a3 = a2.filter(function (val) { return isInArray(a,val.substr(0,val.length-3)) > -1 })
```

``` js
var firstArr = [1,2,3,4,5,6,7,8];
var secondArr = [6,7,8,9,10];
//并集
var bin = new Set([...firstArr,...secondArr]);
console.log([...bin]);
//交集
var jiao = firstArr.filter((val)=>new Set(secondArr).has(val));
console.log(jiao);
//差集
var cha = firstArr.filter((val)=>!new Set(secondArr).has(val));
console.log(char);
```
#### object
在JS中一切都是对象。
``` js
var data={'class1':'chen','class2':'he'};

var dataCount=0;

for(var  key in data ){
    dataCount++; 
    console.log(data[key])
}

data.hasOwnProperty("class2"); 

```


### object
object.prototype

管理getter和setter
``` js
Object.toString()
Object.toLocalString()
Object.toJSON()
Object.valueOf()
Object.defineProperty()
Object.create() // 创建一个对象

seal()
freeze()
```
#### object 访问
object的(.) 和[]都可以访问属性， 其中"."是静态访问（脚本时确定属性名）， 【】是动态访问（先执行表达式确定属性名再访问属性值），所以【】支持特殊关键字/保留字。

#### this 关键词
在 JavaScript 中，被称为 this 的事物，指的是拥有该 JavaScript 代码的对象。

this 的值，在函数中使用时，是“拥有”该函数的对象。

请注意 this 并非变量。它是关键词。您无法改变 this 的值。

### method
通过引入this，使方法和对象分离，this对应一个scope，也引申出了闭包。

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

#### 即时值
即时值，包括 1，2这种数据类型，字符串类型，null等，只能作为右值，
即时值和object有区别， wrapped object


#### type transfer

在布尔类型环境中undefined, 0, "", NaN, null会被转换成 false。


js的类型判断非常混乱，让人头大。例如：nan ，undefined，null，

## var

#### var
var 定义变量，会前置定义


保留字不能作为变量名

#### scope 
scope 分为 全局域和函数域两种。
#### new
new运算符
### misc
delete 不能删除var定义的全局变量


with 可以挂载变量，改变变量的作用域

const

解构赋值
``` js
let [x,y] = [1,2]
[x,y] = [x+1, y+1]
[x,y] =[y,x]

```
#### let

#### var let
var 是 lazy evaluation / let 是eager evalation  

### define
通过var定义函数，只会前置变量名，不能前置匿名函数。

也可以使用 Function 定义函数，此时行为类似 eval。