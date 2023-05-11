# 最全的DOM和BOM的解释分析

[![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/29/169c77b839a53863~tplv-t2oaga2asx-no-mark:100:100:100:100.awebp)](https://juejin.cn/user/3175045312817943)

[王小端coder![创作等级LV.3](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/922e26916a444513bceddad5bcf437e1~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp)](https://juejin.cn/user/3175045312817943)

2019年09月10日 11:08 · 阅读 13362

​    今天咱们就来看看DOM和BOM。什么是DOM和BOM？

DOM（document object model）：文档对象模型，提供操作页面元素的方法和属性



BOM（browser object model）；浏览器对象模型，提供一些属性和方法可以操作浏览器



我想很多的人都看过这样的官方的解释，那具体的如何我们一起来分析下。

## 一 什么是BOM和DOM？

​    Javascript 由三部分构成，ECMAScript，DOM和BOM。根据宿主（浏览器）的不同，具体的表现形式也不尽相同，ie和其他的浏览器风格迥异,IE 扩展了 BOM，加入了 ActiveXObject 类，可以通过 JavaScript 实例化 ActiveX 对象。 

\1. ECMAScript(核心) 　　描述了JS的语法和基本对象

\2. DOM 是文档对象模型，处理网页内容的方法和接口。是W3C 的标准； [所有浏览器公共遵守的标准] 

\3. BOM 是浏览器对象模型，提供与浏览器交互的方法和接口。各个浏览器厂商根据 DOM在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同] 

### 1） DOM的介绍

​    DOM 全称是 Document Object Model，也就是文档对象模型。是针对XML的基于树的API。描述了处理网页内容的方法和接口，是HTML和XML的API，DOM把整个页面规划成由节点层级构成的文档。

​    这个DOM定义了一个HTMLDocument和HTMLElement做为这种实现的基础,就是说为了能以编程的方法操作这个 HTML 的内容（比如添加某些元素、修改元素的内容、删除某些元素），我们把这个 HTML 看做一个对象树（DOM树），它本身和里面的所有东西比如 <div></div> 这些标签都看做一个对象，每个对象都叫做一个节点（node），节点可以理解为 DOM 中所有 Object 的父类。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/10/16d18f3e30fc844c~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

### 2） BOM的介绍

​    BOM 是 Browser Object Model，浏览器对象模型。刚才说过 DOM 是为了操作文档出现的接口，那 BOM 顾名思义其实就是为了控制浏览器的行为而出现的接口。

​    浏览器可以做什么呢？比如跳转到另一个页面、前进、后退等等，程序还可能需要获取屏幕的大小之类的参数。所以 BOM 就是为了解决这些事情出现的接口。比如我们要让浏览器跳转到另一个页面，只需要location.href = "http://www.xxxx.com";这个 location 就是 BOM 里的一个对象。

## 二  DOM和BOM的区别

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/10/16d191189d0a8e54~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

### DOM区域的： 

5区（就是document。由web开发人员呕心沥血写出来的一个文件夹，里面有index.html，CSS和JS的，部署在服务器上，我们可以通过浏览器的地址栏输入URL然后回车将这个document加载到本地，浏览，右键查看源代码等。）

###  BOM区域的： 

1区（浏览器的标签页，地址栏，搜索栏，书签栏，窗口放大还原关闭按钮，菜单栏等等） 

2区（滚动条scroll bar） 

3区（浏览器的右键菜单） 

4区（document加载时的状态栏，显示http状态码等） 

## 三 DOM和BOM的联系

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/10/16d191f327978675~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

​    BOM的核心是Window，而Window对象又具有双重角色，它既是通过js访问浏览器窗口的一个接口，又是一个Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都以window作为其global对象。

Window对象包含属性：document、location、navigator、screen、history、frames

Document根节点包含子节点：forms、embeds、anchors、images、links

从window.document已然可以看出，DOM的最根本的对象是BOM的window对象的子对象。

​    由于BOM的window包含了document，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM（Document Object Model）模型的根节点。

   可以说，BOM包含了DOM(对象)，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。





**结束语： 做一个努力、勤奋、主动的前端工程师**



分类：

[前端](https://juejin.cn/frontend)

标签：

[JavaScript](https://juejin.cn/tag/JavaScript)