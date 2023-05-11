# JS中的 类和对象

[![可多C](https://pica.zhimg.com/v2-d7f858280d8dadd711f4c65c73eab120_l.jpg?source=172ae18b)](https://www.zhihu.com/people/yi-ge-pu-pu-tong-tong-de-xiao-huo)

[可多C](https://www.zhihu.com/people/yi-ge-pu-pu-tong-tong-de-xiao-huo)

**类 ：**对一群具有相同特征的对象的集合的描述；
**对象：**真实存在的对象个体；



1、比如人类，指的是一个范围； 对象：比如某个人，指的是这个范围中具体的对象

2、对象中，继承靠原型链，多态靠弱类型，封装……虽然可以靠闭包，但我个人更推崇和python一样的，下划线代表私有的风格

3、Javascript中的function作为构造函数时，就是一个类，搭配上new操作符，可以返回一个对象。


当然，要生成一个对象，也可以用字面量的形式，例如var obj = {x: 1, y: function(){} };
类可以理解为一个模板，而对象就是根据这个模板造出来的具体实例。

JS是面向对象，而不是面向类。



**instanceof 判断一个对象是不是属于一个类(只要是父级都会返回true)**

1、形式： `对象 instanceof 构造函数`
2、constructor 判断直接的父级

```js
Object instanceof Function            //true
Object instanceof Object              //true
Function instanceof Function          //true
Function instanceof Object            //true

var date = new Date();
date instanceof Date                  //true
date.constructor                      //Date
```





## **创建类的方法：**

### **1、构造函数 方式**

```js
function Car(color,door){
this.color = color;
this.doors = door;
this.showColor = function(){
alert(this.color)
};
}
var car1 = new Car(“red”,4);
var car2 = new Car(“blue”,4);
```

可以看到构造函数方式在函数内部没有创建对象，是用this关键字。因为在用 new 调用构造函数时已经创建了对象，而在函数内部只能用this来访问对象属性。

每次调用都会为新对象创建自己的方法。





### **2、原型 方式**

```js
function Car(){
}
Car.prototype.color = “red”;
Car.prototype.doors = 4;
Car.prototype.arr = new Array(“a”,”b”);
Car.prototype.showColor = function(){
alert(this.color);
}
var car1 = new Car();
var car2 = new Car();
car1.arr.push(“cc”);
alert(car1.arr); //output:aa,bb,cc
alert(car2.arr); //output:aa,bb,cc
```

首先定义了一个空函数，**函数名就是类名**，然后通过prototype属性来定义对象的属性。调用该函数时，原型的所有属性都会立即赋予要创建的对象。

改变任意一个该函数的属性时，都是直接在其共有的原型上做的改动。



### **3、混合构造函数/原型 方式**

```js
function Car(color,door){
this.color = color;
this.doors = door;
this.arr = new Array(“aa”,”bb”);
}
Car.prototype.showColor(){
alert(this.color);
}
var car1 = new Car(“red”,4);
var car2 = new Car(“blue”,4);
car1.arr.push(“cc”);
alert(car1.arr); //output:aa,bb,cc
alert(car2.arr); //output:aa,bb
```

构造函数/原型方式可以像其他程序设计语言一样创建对象，是用构造函数定义对象的非函数属性，用原型方式定义对象的方法。将属性与方法的赋值分离开。

改变 car1 的属性，并不改变 car2 的属性。（但 car1 原型上的方法改变时，car2 的方法同步改变）



### **4、动态原型 方式**

```js
function Car(color,door){
   this.color = color;
   this.doors = door;
   this.arr = new Array(“aa”,”bb”);
   if(typeof Car._initialized == “undefined”){
     Car.prototype.showColor = function(){
        alert(this.color);
      };
     Car._initialized = true;
   }
}
```

动态原型的方式同混合的构造函数/原型方式原理相似，唯一的区别是赋予对象方法的位置。

动态原型方式是使用一个标志来判断是否已经给原型赋予了方法，这样可以保证该方法只创建一次。





**目前使用最广泛的就是混合构造函数/原型方式，此外，动态原型方式也很流行。在功能上与构造函数/原型方式等价。**



发布于 2018-07-26 14:56

[ECMAScript](https://www.zhihu.com/topic/19600610)

[jQuery](https://www.zhihu.com/topic/19557964)

[原生 JavaScript](https://www.zhihu.com/topic/19691834)