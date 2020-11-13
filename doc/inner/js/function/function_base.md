# function



js 的运行中，如果IO函数是异步的，例如等待文件IO，执行定时器动作，都会跳过等待过程，执行以下语句。
``` js
function funca() {
	console.log("before call")
	fileDialog.open() 
	console.log("after call")
}
```

## argument
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

### 返回参数
#### 默认行为
当函数执行完后,默认执行return undefined

#### 变长参数
js 无法返回变长参数，一般通过间接的方法实现：
* 返回数组
* 返回字典
* 返回json字符


## base function



``` js
var numbers = [1, 2, 3, 4];
Math.max.apply(null, numbers) // 4
Math.min.apply(null, numbers) // 1

Math.random()
Math.cos()
Math.abs()

```