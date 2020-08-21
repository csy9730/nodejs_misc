# javascript

## base

### datatype

* number  
* string   
* boolean   
* null
* undefined   
* array  
* object
* function

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
#### type transfer

在布尔类型环境中undefined, 0, "", NaN, null会被转换成 false。

### function

js 的运行中，如果IO函数是异步的，例如等待文件IO，执行定时器动作，都会跳过等待过程，执行以下语句。
``` js
function funca() {
	console.log("before call")
	fileDialog.open() 
	console.log("after call")
}
```

#### argument



变长参数
``` js
function sum2(x,y,z){
	var s = 0;
	if(z)
		s+=z;
	if (y)
		s+=y;
	s+=x;
	return s;
}
sum2(3,4,5);


var alert = console.log;
function sum(){
	var x = 0;
	for(var i=0;i<arguments.length;i++ ){
		x += arguments[i];
	}
	alert( x )
}
sum(1,2,3,4,5,6,7,8,9,10,11,12);
```
默认参数
``` js
function foo(num1) {
if (num1 === undefined) {
num1 = 9;
}
console.log(num1);
}
foo();
```

javascript6支持以下写法
``` js
function foo(num1 =9) {
console.log(num1);
}
foo();
```


当函数执行完后,默认执行return undefined

#### base function



``` js
var numbers = [1, 2, 3, 4];
Math.max.apply(null, numbers) // 4
Math.min.apply(null, numbers) // 1

Math.random()
Math.cos()
Math.abs()

```

#### json

``` js
doc = '[{"name": "张三","sex": "男","email": "zhangsan@123.com"},{"name": "李四","sex": "男","email": "lisi@123.com" },{"name": "王五",  "sex": "女", "email": "wangwu@123.com"    }]'
var json = JSON.parse(doc);                
console.log(json)

console.log(json[0].["name"])
console.log(json[0].name);
var jdoc = JSON.stringify(json);

```
