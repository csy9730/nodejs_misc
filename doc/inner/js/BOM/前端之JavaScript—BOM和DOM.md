# [前端之JavaScript—BOM和DOM](https://www.cnblogs.com/JZjuechen/p/15894212.html)

## 一、BOM和DOM概述[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#一bom和dom概述)

通过之前的两篇文章，相信大家已经掌握了JavaScript的一些简单的语法。但是这些简单的语法，并没有和浏览器有任何交互。也就是我们还不能制作一些我们经常看到的网页的一些交互，因此我们需要继续学习BOM和DOM相关知识。

> JavaScript分为ECMAScript，DOM，BOM。

BOM（Browser Object Model）是指浏览器对象模型，它使 JavaScript 有能力与浏览器进行“对话”。

DOM （Document Object Model）是指文档对象模型，通过它，可以访问HTML文档的所有元素。

window对象是客户端JavaScript最高层对象之一，由于window对象是其它大部分对象的共同祖先，在调用window对象的方法和属性时，可以省略window对象的引用。例如：window.document.write()可以简写成：document.write()。

## 二、BOM[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#二bom)

#### 2.1 window对象[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#21-window对象)

所有浏览器都支持window对象，它表示浏览器窗口。

*`如果文档包含框架（frame 或 iframe 标签），浏览器会为 HTML 文档创建一个 window 对象，并为每个框架创建一个额外的 window 对象。`*

*`没有应用于 window 对象的公开标准，不过所有浏览器都支持该对象。`*

所有JavaScript全局对象、函数以及变量均自动成为window对象的成员。

全局变量是window对象的属性。全局函数是window对象的方法。

下面涉及到的HTML DOM 的document也是window对象的属性之一。

一些常用的 window 方法：

- window.innerHeight - 浏览器窗口的内部高度
- window.innerWidth - 浏览器窗口的内部宽度
- window.open() - 打开新窗口
- window.close() - 关闭当前窗口

#### 2.2 window的子对象[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#22-window的子对象)

##### 2.2.1 navigator对象（了解）[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#221-navigator对象了解)

浏览器对象，通过这个对象可以判定用户所使用的浏览器，包含了浏览器相关信息。

```JavaScript
navigator.appName　　// Web浏览器全称
navigator.appVersion　　// Web浏览器厂商和版本的详细字符串
navigator.userAgent　　// 客户端绝大部分信息
navigator.platform　　　// 浏览器运行所在的操作系统
```

##### 2.2.2 screen对象（了解）[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#222-screen对象了解)

屏幕对象，不常用。

一些属性：

- screen.availWidth - 可用的屏幕宽度
- screen.availHeight - 可用的屏幕高度

##### 2.2.3 history对象（了解）[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#223-history对象了解)

window.history 对象包含浏览器的历史。

浏览历史对象，包含了用户对当前页面的浏览历史，但我们无法查看具体的地址，可以简单的用来前进或后退一个页面。

```JavaScript
history.forward()  // 前进一页
history.back()  // 后退一页
```

##### 2.2.4 location对象[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#224-location对象)

window.location对象用于获得当前页面的地址（URL），并把浏览器重定向到新的页面。

常用属性和方法：

```JavaScript
location.href  获取URL
location.href = "URL"  // 跳转到指定页面
location.reload() 重新加载页面
```

#### 2.3 弹出框[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#23-弹出框)

可以在JavaScript中创建三种消息框：警告框、确认框、提示框。

##### 2.3.1 警告框[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#231-警告框)

警告框经常用于确保用户可以得到某些信息。

当警告框出现后，用户需要点击确定按钮才能继续进行操作。

语法：

```JavaScript
alert("你看到了吗？");
```

##### 2.3.2 确认框[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#232-确认框)

确认框用于使用户可以验证或者接收某些信息。

当确认框出现后，用户需要点击确定或者取消按钮才能继续进行操作。

如果用户点击确认，那么返回值为true；如果用户点击取消，那么返回值为false。

语法：

```JavaScript
confirm("你确定吗？");
```

##### 2.3.3 提示框[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#233-提示框)

提示框经常用于提示用户在进入页面前输入某个值。

当提示框出现后，用户需要输入某个值，然后点击确认或取消按钮才能继续操纵。

如果用户点击确认，那么返回值为输入的值；如果用户点击取消，那么返回值为null。

语法：

```JavaScript
prompt("请在下方输入你的答案");
```

#### 2.4 计时相关[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#24-计时相关)

通过使用JavaScript，我们可以在一定时间间隔之后来执行代码，而不是在函数被调用后立即执行。我们称之为计时事件。

##### 2.4.1 setTimeout()[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#241-settimeout)

语法：

```JavaScript
var t=setTimeout("JS语句",毫秒)
```

setTimeout() 方法会返回某个值。在上面的语句中，值被储存在名为 t 的变量中。假如你希望取消这个 setTimeout()，你可以使用这个变量名来指定它。

setTimeout() 的第一个参数是含有 JavaScript 语句的字符串。这个语句可能诸如 "alert('5 seconds!')"，或者对函数的调用，诸如 alertMsg()。

第二个参数表示从当前起多少毫秒后执行第一个参数（1000毫秒等于一秒）。

##### 2.4.2 clearTimeout()[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#242-cleartimeout)

语法：

```JavaScript
clearTimeout(setTimeout_variable)
```

举个例子：

```JavaScript
// 在指定时间之后执行一次相应函数
var timer = setTimeout(function(){alert(123);}, 3000);

// 取消setTimeout设置
clearTimeout(timer);
```

##### 2.4.3 setInterval()[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#243-setinterval)

setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。

setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。

语法：

```JavaScript
setInterval("JS语句",时间间隔)
```

返回值：

一个可以传递给 Window.clearInterval() 从而取消对 code 的周期性执行的值。

##### 2.4.4 clearInterval()[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#244-clearinterval)

clearInterval() 方法可取消由 setInterval() 设置的 timeout。

clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。

语法：

```JavaScript
clearInterval(setinterval返回的ID值)
```

举个例子：

```JavaScript
// 每隔一段时间就执行一次相应函数
var timer = setInterval(function(){console.log(123);}, 3000)

// 取消setInterval设置
clearInterval(timer);
```

## 三、DOM[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#三dom)

DOM（Document Object Model）是一套对文档的内容进行抽象和概念化的方法。

当网页被加载时，浏览器会创建页面的文档对象模型（Document Object Model）。

HTML DOM 模型被构造为对象的树。

#### 3.1 HTML DOM 树[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#31-html-dom-树)

[![img](https://images2018.cnblogs.com/blog/867021/201803/867021-20180312215352312-132101897.png)](https://images2018.cnblogs.com/blog/867021/201803/867021-20180312215352312-132101897.png)

DOM标准规定HTML文档中的每个成分都是一个节点（node）：

- 文档节点(document对象)：代表整个文档
- 元素节点(element 对象)：代表一个元素（标签）
- 文本节点(text对象)：代表元素（标签）中的文本
- 属性节点(attribute对象)：代表一个属性，元素（标签）才有属性
- 注释是注释节点(comment对象)　

JavaScript 可以通过DOM创建动态的 HTML：

- JavaScript 能够改变页面中的所有 HTML 元素
- JavaScript 能够改变页面中的所有 HTML 属性
- JavaScript 能够改变页面中的所有 CSS 样式
- JavaScript 能够对页面中的所有事件做出反应

#### 3.2 查找标签[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#32-查找标签)

##### 3.2.1 直接查找[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#321-直接查找)

```JavaScript
document.getElementById           根据ID获取一个标签
document.getElementsByClassName   根据class属性获取标签合集
document.getElementsByTagName     根据标签名获取标签合集
```

注意：

> 在不使用window.onload的情况下，涉及到DOM操作的JS代码应该放在文档的最后。

##### 3.2.2 间接查找[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#322-间接查找)

```JavaScript
parentElement            父节点标签元素
children                 所有子标签
firstElementChild        第一个子标签元素
lastElementChild         最后一个子标签元素
nextElementSibling       下一个兄弟标签元素
previousElementSibling   上一个兄弟标签元素
```

#### 3.3 节点操作[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#33-节点操作)

##### 3.3.1 创建节点[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#331-创建节点)

语法：

```JavaScript
createElement(标签名)
```

示例 ：

```JavaScript
var divEle = document.createElement("div");
```

##### 3.3.2 添加节点[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#332-添加节点)

语法：

- 追加一个子节点（作为最后的子节点）：somenode.appendChild(newnode)；
- 把增加的节点放到某个节点的前边：somenode.insertBefore(newnode,某个节点);

示例：

```JavaScript
var imgEle = document.createElement("img");
imgEle.setAttribute("src", "http://image11.m1905.cn/uploadfile/s2010/0205/20100205083613178.jpg");

var d1Ele = document.getElementById("d1");
d1Ele.appendChild(imgEle);
```

##### 3.3.3 删除节点[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#333-删除节点)

语法：

获得要删除的元素，通过父元素调用该方法删除：somenode.removeChild(要删除的节点)。

##### 3.3.4 替换节点[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#334-替换节点)

语法：

somenode.replaceChild(newnode, 某个节点)。

##### 3.3.5 属性节点[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#335-属性节点)

获取文本节点的值：

```JavaScript
var divEle = document.getElementById("d1")
divEle.innerText
divEle.innerHTML
```

设置文本节点的值：

```JavaScript
var divEle = document.getElementById("d1")
divEle.innerText="1"
divEle.innerHTML="<p>2</p>"
```

innerText：

- 不加赋值符号是获取内部文本
- 加了赋值符号是设置内置文本
- 不可以识别HTML标签

innerHTML：

- 不加赋值符号是获取内部标签+文本
- 加了赋值符号是设置内置标签+文本
- 可以识别HTML标签

**attribute操作：**

```JavaScript
var divEle = document.getElementById("d1");
divEle.setAttribute("age","18")
divEle.getAttribute("age")
divEle.removeAttribute("age")

// 自带的属性还可以直接通过.属性名来获取和设置
imgEle.src
imgEle.src = "..."
```

##### 3.3.6 获取值操作[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#336-获取值操作)

语法：

```JavaScript
elementNode.value
```

适用于以下标签：

- input
- select
- textarea

```JavaScript
var iEle = document.getElementById("i1");
console.log(iEle.value);
var sEle = document.getElementById("s1");
console.log(sEle.value);
var tEle = document.getElementById("t1");
console.log(tEle.value);
```

特殊的文件数据获取：

> 标签对象.value —— 仅获取一个文件地址；
> 标签对象.files[0] —— 获取单个文件数据；
> 标签对象.files —— 获取所有文件数据；

##### 3.3.7 class的操作[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#337-class的操作)

```JavaScript
className  获取所有样式类名(字符串形式)
classList  获取所有的类

classList.remove(cls)  删除指定类
classList.add(cls)  添加类
classList.contains(cls)  存在返回true，否则返回false
classList.toggle(cls)  存在就删除，否则就添加
```

##### 3.3.8 指定CSS样式操作[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#338-指定css样式操作)

```JavaScript
obj.style.backgroundColor="red"
```

JS操作CSS属性的规律：

1. 对于没有中横线的CSS属性一般直接使用style.属性名即可。如：

   ```JavaScript
   obj.style.margin
   obj.style.width
   obj.style.left
   obj.style.position
   ```

2. 对含有中横线的CSS属性，将中横线后面的第一个字母换成大写即可。如：

   ```JavaScript
   obj.style.marginTop
   obj.style.borderLeftWidth
   obj.style.zIndex
   obj.style.fontFamily
   ```

## 四、事件[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#四事件)

HTML 4.0 的新特性之一是有能力使 HTML 事件触发浏览器中的动作（action），比如当用户点击某个 HTML 元素时启动一段 JavaScript。下面是一个属性列表，这些属性可插入 HTML 标签来定义事件动作。

#### 4.1 常用事件[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#41-常用事件)

- `onclick`：当用户点击某个对象时调用的事件句柄。
- `ondblclick`：当用户双击某个对象时调用的事件句柄。
- `onfocus`：元素获得焦点。（应用场景：输入框）
- `onblur`：元素失去焦点。（应用场景：用于表单验证,用户离开某个输入框时,代表已经输入完了,我们可以对它进行验证）
- `onchange`：域的内容被改变。（应用场景：通常用于表单元素,当元素内容被改变时触发，如：select联动）
- `onkeydown`：某个键盘按键被按下。（应用场景: 当用户在最后一个输入框按下回车按键时,表单提交）
- `onkeypress`：某个键盘按键被按下并松开。
- `onkeyup`：某个键盘按键被松开。
- `onload`：一张页面或一幅图像完成加载。
- `onmousedown`：鼠标按钮被按下。
- `onmousemove`：鼠标被移动。
- `onmouseout`：鼠标从某元素移开。
- `onmouseover`：鼠标移到某元素之上。
- `onselect`： 在文本框中的文本被选中时发生。
- `onsubmit`：确认按钮被点击，使用的对象是form。

#### 4.2 绑定方式[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#42-绑定方式)

- **方式一：**

  ```html
  <div id="d1" onclick="changeColor(this);">点我</div>
  
  <script>
    function changeColor(ths) {
      ths.style.backgroundColor = "green";
    }
  </script>
  ```

  注意：

  > this是实参，表示触发事件的当前元素。
  >
  > 函数定义过程中的ths为形参。

- **方式二：**

  ```html
  <div id="d2">点我</div>
  
  <script>
    var divEle2 = document.getElementById("d2");
    divEle2.onclick=function () {
      this.innerText = "有惊喜！";
    }
  </script>
  ```

#### 4.3 事件示例[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#43-事件示例)

1. **定时器示例：**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>定时器示例</title>
       <meta name="viewport" content="width=device-width, initial-scale=1">
   </head>
   <body>
   <input type="text" id="i1">
   <button id="b1">开始</button>
   <button id="b2">结束</button>
   
   <script>
       var t;
   
       function showTime(date = new Date()) {
           var i1Ele = document.getElementById('i1')
           var time = date;
           i1Ele.value = time.toLocaleString();
       }
   
       showTime();
   
       var b1Ele = document.getElementById('b1');
       b1Ele.onclick = function () {
           if (!t) {
               t = setInterval(showTime, 1000)
           }
       }
       var b2Ele = document.getElementById('b2');
       b2Ele.onclick = function (ev) {
           clearInterval(t);
           t = undefined
       };
   
   </script>
   </body>
   </html>
   ```

2. **搜索框示例：**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>搜索框示例</title>
   
   </head>
   <body>
   <input id="d1" type="text" value="请输入关键字">
   <script>
       var inputEle = document.getElementById("d1");
       inputEle.onfocus = function () {
           if (inputEle.value === "请输入关键字") {
               console.log(inputEle.value)
               inputEle.value = "";
           }
       }
   
       inputEle.onblur = function () {
           var val = inputEle.value;
           if (!val.trim()) {
               inputEle.value = "请输入关键字";
           }
       }
   </script>
   </body>
   </html>
   ```

3. **select省市联动：**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="x-ua-compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>select省市联动</title>
   </head>
   <body>
   <select id="province">
       <option>请选择省:</option>
   </select>
   
   <select id="city">
       <option>请选择市:</option>
   </select>
   
   <script>
       data = {
           "河北省": ["廊坊", "邯郸"],
           "北京": ["朝阳区", "海淀区"],
           "山东": ["威海市", "烟台市"],
           "上海": ["浦东区","青浦区","嘉定区"]
       };
   
       let p = document.getElementById("province");
       let c = document.getElementById("city");
   
       for (let i in data) {
           let optionP = document.createElement("option");
           optionP.innerHTML = i;
           optionP.value = i;
           p.appendChild(optionP);
       }
       p.onchange = function () {
           let pro = this.value
           let citys = data[pro];
           // 清空option
           c.innerHTML = "";
   
           for (let i = 0; i < citys.length; i++) {
               let option_city = document.createElement("option");
               option_city.innerHTML = citys[i];
               c.appendChild(option_city);
           }
       }
   </script>
   </body>
   </html>
   ```

#### 4.4 window.onload[#](https://www.cnblogs.com/JZjuechen/p/15894212.html#44-windowonload)

当我们给页面上的元素绑定事件的时候，必须等到文档加载完毕。因为我们无法给一个不存在的元素绑定事件。

window.onload事件会在文件加载过程结束的时候触发。此时，文档中的所有对象都位于DOM中，并且所有图像，脚本，链接和子框架都已完成加载。

注意：

> .onload()函数存在覆盖现象。

 分类: [前端](https://www.cnblogs.com/JZjuechen/category/2104045.html)

 标签: [HTML](https://www.cnblogs.com/JZjuechen/tag/HTML/)

 0

 0

[« ](https://www.cnblogs.com/JZjuechen/p/15886800.html)上一篇： [前端基础之JavaScript（二）](https://www.cnblogs.com/JZjuechen/p/15886800.html)
[» ](https://www.cnblogs.com/JZjuechen/p/15902386.html)下一篇： [前端之jQuery快速入门](https://www.cnblogs.com/JZjuechen/p/15902386.html)