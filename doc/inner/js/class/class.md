# class

实际上，类是“特殊的函数”，就像你能够定义的函数表达式和函数声明一样，类语法有两个组成部分：类表达式和类声明。


``` js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

let p = new Rectangle(); 
```


#### 匿名类
``` js
// 未命名/匿名类
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"
```

#### 构造函数
constructor方法是一个特殊的方法，这种方法用于创建和初始化一个由class创建的对象。一个类只能拥有一个名为“constructor”的特殊方法。如果类包含多个constructor的方法，则将抛出 一个SyntaxError 。


#### 静态方法
static 关键字用来定义一个类的一个静态方法。调用静态方法不需要实例化 (en-US) 该类，但不能通过一个类实例调用静态方法。静态方法通常用于为一个应用程序创建工具函数。

#### 用原型和静态方法绑定 this
当调用静态或原型方法时没有指定 this 的值，那么方法内的 this 值将被置为 undefined。

如果上述代码通过传统的基于函数的语法来实现，那么依据初始的 this 值，在非严格模式下方法调用会发生自动装箱。若初始值是 undefined，this 值会被设为全局对象。

严格模式下不会发生自动装箱，this 值将保留传入状态。

#### 使用 extends 扩展子类
extends 关键字在 类声明 或 类表达式 中用于创建一个类作为另一个类的一个子类。
#### 使用 super 调用超类
super 关键字用于调用对象的父对象上的函数。
``` js
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}
```