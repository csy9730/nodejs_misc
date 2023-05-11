# Javascript

Javascript 由三部分构成，ECMAScript，DOM和BOM。
- ECMAScript
- DOM（document object model）：文档对象模型，提供操作页面元素的方法和属性
- BOM（browser object model）；浏览器对象模型，提供一些属性和方法可以操作浏览器


## BOM
### window
```
window.location
window.open()
window.prompt()
onload()
```
#### 浏览器地址栏
浏览器地址栏可以直接运行JavaScript代码，做法是以`javascript:`开头后跟要执行的语句。比如：`javascript:alert('hello from address bar')`


## DOM
### document
``` js
var ts = document.getElementById("timestamp");
```
### element

## js运行

### js脚本
js脚本 可以以下形式存在于html中：

* 外链在 src中 `< script src="index.js"> </script>`
* 内嵌在 html中 `<script></script>` 
* 行内式：在html标签的属性内,通过行为触发执行.（几乎不用） `<h1 style="color:red;">web前端<h1>`
* 内联在, ~~似乎就是行内式~~
* 放在url中。`<a href="javascript:void window.open('about:blank');"> </a>`



#### url
``` js
<a href="javascript:alert (new Date().toLocaleTimeString());"> check time</a>
```

``` js
<a href="javascript:void window.open('about:blank');"> </a>
```

#### 使用js外链
主流推荐外链使用js脚本。

使用外置Javascript相较于内联Javascript的好处在于:

可维护性:外置Javascript文件可以被多个页面调用而不用在每个页面上反复地书写.如果有需要改变的部分,你只需要在一处修改即可.所以外置Javascript导致代码工作量减少,进而使得维护手续也更加方便

关注点分离:将Javascript封装在外部的.js文件遵循了关注点分离的法则.总体来说,分离HTML,CSS和Javascript从而让我们更容易操纵他们.而且如果是多名开发者同步工作的话,这样也更方便,

表现性:外置Javascript文件可以被浏览器缓存住,但是内联Javascript在每次页面加载的哦时候都会被重新加载


#### 浏览器中如何执行js代码
如何执行js代码？

* 浏览器url栏执行js，`javascript:alert('hello from address bar :)');`,需要显式添加javascript:到行首。
* 打开chrome devTools，选择console页面，可以以交互式输入执行代码


打开浏览器，当作文档编辑器使用：`data:text/html, <html contenteditable>`
