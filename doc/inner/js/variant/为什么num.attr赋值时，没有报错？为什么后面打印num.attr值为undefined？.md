## 为什么num.attr赋值时，没有报错？为什么后面打印num.attr值为undefined？

```javascript
const num = 42;
num.attr = 'str';
console.log(num.attr); // undefined
```

我们首先要知道JavaScript中的基本类型有哪些？

```javascript
// number, string, boolean, undefine, null, symbol, bigint
```

上面这些原始值通过字面量的方式创建的时候没有方法和属性，我们如果需要使用它们就必须使用包装器，而自动装箱就是为了解决这一问题的。

## 自动装箱 autoboxing

自动装箱就是当我们在操作js的基本数据类型（undefined，null除外）时，如`str.length`，JavaScript会将原始类型包装到对应的对象中，这个新对象链接到相关内置<.prototype>，因此我们可以在原始类型调用原型方法。

回到上面问题： `num.attr`当我们给`number`类型赋值不报错，就是因为执行了下面的动作：

- 创建临时的Number类型的一个实例
- 调用这个实例对象的赋值方法
- 拆箱，销毁这个实例 代码表示就是：

```javascript
const num = 42;
cosnt _num = New Number(42); // 创建num的临时实例对象
_num.attr = 'str'; // 给这个对象增加属性attr并赋值‘str’
_null = null; // 销毁这个实例
```

所以，我们在进行`num.attr`赋值的时候，实际上是在操作这个临时的实力对象，所以不会报错。 而当我们再次访问`num.attr`的时候，会生成新的临时实例对象，所以访问到的属性值是`undefined`。

## 手动装箱

我们可以通过`new`操作符来完成手动装箱，例如:

```javascript
new Number(123);
new String('str');
New Boolean(true);
```

不过要慎重使用手动装箱，可能会有意外的效果，比如：

```javascript
const bool = new Boolean(false);
if (bool) {
    console.log('执行了true');
} else {
    console.log('执行了fasle');
}
// 此时执行结果是 - 执行了true
```

此时`bool`的值是`false`，但是`new Boolean`返回的对象是真值，你可以通过下面这样解决这个问题：

```javascript
...
if (bool.valueOf())
...
```

## 拆箱

上面有提到拆箱，也是存在自动拆箱和手动拆箱，当自动装箱完成，临时实例对象会调用`.valueOf()`或`.toString()`来返回原始值。当然你也可以手动调用，实现手动拆箱，如下：

```javascript
const numObj = new Number(1122);
const strObj = new String('str');
console.log(typeof numObj); // ‘object’
console.log(typeof strObj); // ‘object’

console.log(typeof numObj.valueOf()); // 'number'
console.log(typeof strObj.toString()); // 'string'
```

## 写在最后

准备后面慢慢总结和巩固自己的知识，也欢迎大家一起学习，如果有不准缺的地方，还欢迎大佬指正。 当然如果上面的文章对您有帮助，还请点赞支持下，万分感谢🙏。

## 引用

[# JavaScript Boxing Wrappers](https://link.juejin.cn?target=https%3A%2F%2Fjavascript.plainenglish.io%2Fjavascript-boxing-wrappers-5b5ff9e5f6ab)



作者：_Victor
链接：https://juejin.cn/post/7001662785025212446
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。