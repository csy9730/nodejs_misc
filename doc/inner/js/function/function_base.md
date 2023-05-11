# function

## argument

arguments 是类数组的对象

因为他具有数组一样的访问性质及方式, 可以通过 arguments[n] 来访问对应的单个参数的值, 并拥有数组长度属性 length.并且 arguments 对象存储的是实际传给函数的参数,不局限于函数声明时所定义的形参.不能显式创建 arguments 对象,arguments 对象只有函数中才能用.

### 输入参数

#### 默认参数
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
#### 可选参数
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
```

#### 变长参数
变长参数

``` js
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

计算最大值
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


#### callee & caller
caller 直接翻译为调用者，callee 翻译为被召者

``` js
var factorial = function (x){
    if (x<=1) return 1;
    return x* arguments.callee(x-1);
};
```
arguments.callee 指向参数所属的当前执行的函数. 就是说 callee 返回正在被执行的 function 对象, 也就是所指定的 function 对象的正文.

callee 表示对函数对象本身的引用，这有利于匿名函数的递归或者保证函数的封装性

`arguments.length` 是实参长度, `arguments.callee.length` 是形参长度

### 返回参数
#### 默认行为
当函数执行完后,默认执行return undefined

#### 变长参数
js 无法返回变长参数，一般通过间接的方法实现：
* 返回数组
* 返回字典
* 返回json字符

### function namespace


### 匿名函数

#### 立即执行匿名函数返回模块
立即执行匿名函数：
无返回量：可以提供局部名字空间。
如果返回函数（并且立即执行匿名函数内定义var变量）：可以提供闭包。

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
#### 立即执行匿名函数返回模块
``` js
var collections;
if (!collections) collections = { };
collections.sets = (new function namespace()
{
    this.AbstractSet = AbstractSet
        /* ... */
    this.NotSet = NotSet
}())

```


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



### 异步IO函数
js 的运行中，如果IO函数是异步的，例如等待文件IO，执行定时器动作，都会跳过等待过程，执行以下语句。
``` js
function funca() {
	console.log("before call")
	fileDialog.open() 
	console.log("after call")
}
```

## base function

### Math

``` js
var numbers = [1, 2, 3, 4];
Math.max.apply(null, numbers) // 4
Math.min.apply(null, numbers) // 1

Math.random()
Math.cos()
Math.abs()

```