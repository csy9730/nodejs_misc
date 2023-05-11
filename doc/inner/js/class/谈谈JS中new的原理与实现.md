# 谈谈JS中new的原理与实现

[![img](https://p3-passport.byteimg.com/img/user-avatar/8c81576e8b5fe3bb461ea2c8dd2e4f21~100x100.awebp)](https://juejin.cn/user/3324570057847880)

[JaylenL![创作等级LV.4](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4453379f1d416ca00c3619e796d330~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp)](https://juejin.cn/user/3324570057847880)

2021年08月08日 18:16 · 阅读 5631

![谈谈JS中new的原理与实现](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b0c2636f3a84f8e94a19744f4f6242b~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp)

> **这是我参与8月更文挑战的第8天，活动详情查看：[8月更文挑战](https://juejin.cn/post/6987962113788493831)**

## 定义

> `new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

使用`new [constructor]`的方式来创建一个对象实例，但构造函数的差异会导致创建的实例不同。

## 构造函数体不同

构造函数也是函数，其唯一的区别就是调用方式不同，任何函数只要使用 `new` 操作符调用就是构造函数，而不使用 `new` 操作符调用的函数就是普通函数。

因此构造函数也可以带有返回值，但是这会导致`new`的结果不同。

### 无返回值

```js
js复制代码function Person(name) {
  this.name = name;
}

let obj = new Person("Jalenl");
console.log(obj);
```

显然，打印的是`{name:'Jalenl'}`

### 返回对象

```js
js复制代码function Person(age) {
  this.age = age;
  return { name: "Jalenl" };
}

let obj = new Person(18);
console.log(obj);
```

打印的是`{name:'Jalenl'}`，也就是说`return`之前的定义都被覆盖了。这里`return`的是一个对象，那返回的是个基本类型呢？

### 返回非对象

```js
js复制代码function Person(age) {
  this.age = age;
  return 1;
}

let obj = new Person(18);
console.log(obj);
```

返回`{age:21}`,这么说`return`失效了，跟没有`return`一样的结果，那如果没有`this`绑定内部属性，再返回基本数据类型呢？

### 没有属性绑定+返回非对象

```js
js复制代码function Person(){
    return 1
}
new Person()
```

返回的是一个空对象`{}`，意料之中。

**综上，只有构造函数`return`返回的是一个对象类型时，才能改变初始结果。**

## 构造函数类型不同

### 构造函数为普通函数

`ECMA-262 3rd. Edition Specification`中的说明了对象实例的创建过程：

> [13.2.2](https://link.juejin.cn/?target=http%3A%2F%2Fwww.interglacial.com%2Fjavascript_spec%2Fa-13.html%23a-13.2) `[[Construct]]`
>
> When the `[[Construct]]` property for a `Function` object `F` is called, the following steps are taken:
>
> 1. Create a new native ECMAScript object.
> 2. Set the [`[[Class\]]`](https://link.juejin.cn/?target=http%3A%2F%2Fbclary.com%2F2004%2F11%2F07%2F%23_Class_) property of `Result(1)` to `"Object"`.
> 3. Get the value of the prototype property of `F`.
> 4. If `Result(3)` is an object, set the [`[[Prototype\]]`](https://link.juejin.cn/?target=http%3A%2F%2Fwww.interglacial.com%2Fjavascript_spec%2Fa-4.html%23a-4.3.5) property of `Result(1)` to `Result(3)`.
> 5. If `Result(3)` is not an object, set the [`[[Prototype\]]`](https://link.juejin.cn/?target=http%3A%2F%2Fwww.interglacial.com%2Fjavascript_spec%2Fa-4.html%23a-4.3.5) property of `Result(1)` to the original `Object` prototype object as described in [15.2.3.1](https://link.juejin.cn/?target=http%3A%2F%2Fwww.interglacial.com%2Fjavascript_spec%2Fa-15.html%23a-15.2.3.1).
> 6. Invoke the [`[[Call\]]`](https://link.juejin.cn/?target=http%3A%2F%2Fbclary.com%2F2004%2F11%2F07%2F%23a-13.2.1) property of `F`, providing `Result(1)` as the `this` value and providing the argument list passed into `[[Construct]]` as the argument values.
> 7. If `Type(Result(6))` is `Object` then return `Result(6)`.
> 8. Return `Result(1)`.

总结下来就是：

1. 在内存中创建一个新对象。
2. 这个新对象内部的`[[Prototype]]`特性被赋值为构造函数的 `prototype` 属性。
3. 构造函数内部的 `this` 被赋值为这个新对象（即 `this` 指向新对象）。
4. 执行构造函数内部的代码（给新对象添加属性）。
5. 如果构造函数返回对象，则返回该对象；否则，返回刚创建的新对象(空对象)。

第五步就已经说明了构造函数不同导致`new`结果不同的原因。

以下摘自`MDN`的解释：

> 当代码 new Foo(…) 执行时，会发生以下事情：
>
> 1. 一个继承自 Foo.prototype 的新对象被创建。
> 2. 使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
> 3. 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（**一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤**）

### 构造函数为箭头函数

普通函数创建时，引擎会按照特定的规则为这个函数创建一个`prototype`属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为 `constructor` 的属性，指回与之关联的构造函数。

```js
js复制代码function Person(){
    this.age = 18;
}
Person.prototype
/**
{
    constructor: ƒ Foo()
    __proto__: Object
}
**/
```

创建箭头函数时，引擎不会为其创建`prototype`属性，箭头函数没有`constructor`供`new`调用，因此使用`new`调用箭头函数会报错！

```js
js复制代码const Person = ()=>{}
new Person()//TypeError: Foo is not a constructor
```

## 手写new

综上，熟悉了`new`的工作原理后，我们可以自己实现一个低配版的`new`，实现的关键是：

1. 让实例可以访问到私有属性；
2. 让实例可以访问构造函数原型（`constructor.prototype`）所在原型链上的属性；
3. 构造函数返回的最后结果是引用数据类型。

```js
js复制代码function _new(constructor, ...args) {
    // 构造函数类型合法判断
    if(typeof constructor !== 'function') {
      throw new Error('constructor must be a function');
    }
    // 新建空对象实例
    let obj = new Object();
    // 将构造函数的原型绑定到新创的对象实例上
    obj.__proto__ = Object.create(constructor.prototype);
    // 调用构造函数并判断返回值
    let res = constructor.apply(obj,  args);
    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typeof res === 'function';
    // 如果有返回值且返回值是对象类型，那么就将它作为返回值，否则就返回之前新建的对象
    return isObject || isFunction ? res : obj;
};
```

这个低配版`new`实现可以用来创建自定义类的实例，但不支持内置对象，毕竟`new`属于操作符，底层实现更加复杂。

分类：

[前端](https://juejin.cn/frontend)

标签：

[前端](https://juejin.cn/tag/前端)[JavaScript](https://juejin.cn/tag/JavaScript)