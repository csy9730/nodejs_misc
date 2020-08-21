# js中call()和apply()方法的区别和用法详解



今天又碰到了JacvaScript中的`call()`和`apply()`方法，然后看看学学，敲了遍代码，才大概对这两个方法有些了解，这篇博客是对这两个方法的归纳整理，如果有写的不够详细或者有错误的地方欢迎指出。

## 1.定义

每个函数都包含两个非继承而来的方法：`call()`方法和`apply()`方法。

`call`和`apply`可以用来**重新定义函数的执行环境**，也就是`this`的指向；`call`和`apply`都是为了改变某个函数运行时的`context`，即上下文而存在的，换句话说，就是为了改变函数体内部`this`的指向。

### 语法

#### call()

调用一个对象的方法，**用另一个对象替换当前对象**，可以继承另外一个对象的属性，它的语法是：

```js
Function.call(obj[, param1[, param2[, [,...paramN]]]]);
```

- `obj`：这个对象将代替`Function`类里`this`对象
- `params`：一串参数列表

**说明**：`call`方法可以用来代替另一个对象调用一个方法，`call`方法可以将一个函数的对象上下文从初始的上下文改变为`obj`指定的新对象，如果没有提供`obj`参数，那么Global对象被用于`obj`。

#### apply()

和`call()`方法一样，只是参数列表不同，语法：

```js
Function.apply(obj[, argArray]);
```

- `obj`：这个对象将代替`Function`类里`this`对象
- `argArray`：这个是数组，它将作为参数传给`Function`

**说明**：如果`argArray`不是一个有效数组或不是`arguments`对象，那么将导致一个`TypeError`，如果没有提供`argArray`和`obj`任何一个参数，那么Global对象将用作`obj`。

## 2.相同点

`call()`和`apply()`方法的相同点就是这两个方法的作用是一样的。都是在特定的作用域中调用函数，等于设置函数体内`this`对象的值，以**扩充函数赖以运行的作用域**。

一般来说，`this`总是指向调用某个方法的对象，但是使用`call()`和`apply()`方法时，就会改变`this`的指向，看个例子：

```js
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

console.log(add.call(sub, 2, 1));//3
```

为什么`add.call(sub, 2, 1)`的执行结果是`3`呢，因为`call()`方法改变了`this`的指向，使得`sub`可以调用`add`的方法，也就是用`sub`去执行`add`中的内容，再来看一个例子：

```js
function People(name, age) {
    this.name = name;
    this.age = age;
}

function Student(name, age, grade) {
    People.call(this, name, age);
    this.grade = grade;
}

var student = new Student('小明', 21, '大三');
console.log(student.name + student.age + student.grade);//小明21大三
```

在这个例子中，我们并没有给`Student`的`name`和`age`赋值，但是存在这两个属性的值，这还是要归功于`call()`方法，它可以改变`this`的指向。
在这个例子里，`People.call(this, name, age);`中的`this`代表的是`Student`，这也就是之前说的，使得`Student`可以调用`People`中的方法，因为`People`中有`this.name = name;`等语句，这样就将`name`和`age`属性创建到了`Student`中。

总结一句话就是`call()`可以让**括号里的对象来继承括号外函数的属性**。

至于`apply()`方法作用也和`call()`方法一样，可以这么写：

```js
People.apply(this, [name, age]);
```

或者这么写：

```js
People.apply(this, arguments);
```

在这里`arguments`和`[name, age]`是等价的。

## 3.不同点

从定义中也可以看出来，`call()`和`apply()`的不同点就是**接收参数的方式不同**。

- **apply()方法**接收两个参数，一个是函数运行的作用域（`this`），另一个是参数数组。
- **call()方法**不一定接受两个参数，第一个参数也是函数运行的作用域（`this`），但是传递给函数的参数必须列举出来。

在给对象参数的情况下,如果参数的形式是数组的时候,比如之前`apply()`方法示例里面传递了参数`arguments`,这个参数是数组类型,并且在调用`Person`的时候参数的列表是对应一致的(也就是`Person`和`Student`的参数列表前两位是一致的)就可以采用`apply()`方法。

但是如果`Person`的参数列表是这样的`(age,name)`，而Student的参数列表是`(name,age,grade)`，这样就可以用`call()`方法来实现了,也就是直接指定参数列表对应值的位置`Person.call(this,age,name)`。

## 4.拓展

### apply()的其他用法

`apply`有一个巧妙的用处,就是可以**将一个数组默认的转换为一个参数列表**(`[param1,param2,param3]`转换为`param1,param2,param3`)，借助`apply`的这点特性，所以就有了以下高效率的方法：

#### 1）Math.max可以实现得到数组中最大的一项

因为`Math.max`参数里面不支持`Math.max([param1,param2])`，也就是数组，但是它支持`Math.max(param1,param2,param3…)`，所以可以根据`apply`的那个特点来解决：

```js
var array = [1, 2, 3];
var max = Math.max.apply(null, array);
console.log(max);//3
```

这样轻易的可以得到一个数组中最大的一项，`apply`会将一个数组装换为一个参数接一个参数的传递给方法，这块在调用的时候第一个参数给了一个`null`，这个是因为没有对象去调用这个方法，我们只需要用这个方法帮我运算，得到返回的结果就行，所以直接传递了一个`null`过去，当然，第一个参数使用`this`也是可以的：

```js
var array = [1, 2, 3];
var max = Math.max.apply(this, array);
console.log(max);//3
```

使用`this`就相当于用全局对象去调用`Math.max`，所以也是一样的。

#### 2）Math.min可以实现得到数组中最小的一项

同样的`Math.min`和`Math.max`是一个思想：

```js
var array = [1, 2, 3];
var min = Math.min.apply(null, array);
console.log(min);//1

```

当然，`apply`的第一个参数可以用`null`也可以用`this`，这个是和`Math.max`一样的。

#### 3）Array.prototype.push可以实现两个数组合并

同样的，`push`方法没有提供`push`一个数组，但是它提供了`push(param1,param,…paramN)`所以同样也可以通过`apply`来装换一下这个数组，即:

```js
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);//[ 1, 2, 3, 4, 5, 6 ]
```

可以这样理解，`arr1`调用了`Array`的`push`方法，参数是通过`apply`将数组装换为参数列表的集合，其实，`arr1`也可以调用自己的`push`方法：

```js
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
arr1.push.apply(arr1, arr2);
console.log(arr1);//[ 1, 2, 3, 4, 5, 6 ]
```

也就是只要有`push`方法，`arr1`就可以利用`apply`方法来调用该方法，以及使用`apply`方法将数组转换为一系列参数，所以也可以这样写：

```js
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
[].push.apply(arr1, arr2);
console.log(arr1);//[ 1, 2, 3, 4, 5, 6 ]
```

### 总结

一般在目标函数只需要n个参数列表，但是不接收一个数组的形式（`[param1[,param2[,…[,paramN]]]]`），我们就可以通过`apply`的方式来巧妙地解决。