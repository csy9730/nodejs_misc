# http请求中的payload

[![img](https://p3-passport.byteimg.com/img/user-avatar/cdca9569decf13343fef8a3f2c9737e3~100x100.awebp)](https://juejin.cn/user/387497728687757)

[皈依kk![创作等级LV.4](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4453379f1d416ca00c3619e796d330~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp)](https://juejin.cn/user/387497728687757)

2022年02月14日 16:13 · 阅读 816

## 概念：

payload，翻译过来是有效载荷



**payload 字面意思“有效载荷，有效负荷，有效载重”。**要解释什么是有效载重，用货运行业打个比方：
比如有一位客户需要支付一笔费用委托货车司机运送一车石油，石油本身的重量、车子的重量、司机的重量等等，这些都属于载重(load)。  
但是对于该客户来说，他关心的只有石油的重量，所以石油的重量是有效载重(payload，也就是付费的重量)。所以抽象一下，payload 可以理解为一系列信息中最为关键的信息。对于程序员来说就是在程序中 起关键作用的代码。
回到代码中，举一个最简单的例子，一个 ajax 请求返回一个 JSON 格式
css复制代码

```json
{
    status: 200,
    hasError: false,
    data: {
        userId: 1,
        name: 'undefined'
    }
}
```

这里的 `data` 就是 payload，也就是关键信息。而 `status`、`hasError`等信息是`load`，虽然也是信息，但相对没有那么重要。
**surprise！** 500G网络安全学习资料，👉戳此[免费获取](https://link.juejin.cn/?target=https%3A%2F%2Fshimo.im%2Fdocs%2FgjP9hVcHctyCTTPD%2F)

## 安全方面：

复制代码通常在传输数据时，为了使数据传输更可靠，要把原始数据分批传输，并且在每一批数据的头和尾都加上一定的辅助信息，
比如数据量的大小、校验位等，这样就相当于给已经分批的原始数据加一些外套，这些外套起标示作用，使得原始数据不易丢失，
一批数据加上“外套”就形成了传输通道的基本传输单元，叫做数据帧或数据包，而其中的原始数据就是payload



## 应用：

[后台获取放在Request Payload中的值](https://link.juejin.cn/?target=https%3A%2F%2Fyq.aliyun.com%2Fziliao%2F322502)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ad2a22f931e4075a6e26892443e0203~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

后台要想从Request Payload中得到自己想要的数据,就要从流中来获取数据，具体的代码为

```java
private String getStringFromStream(HttpServletRequest req) { 
ServletInputStream is; 
try { 
is = req.getInputStream(); 
int nRead = 1; 
int nTotalRead = 0; 
byte\[\] bytes = new byte\[10240\]; 
while (nRead > 0) { 
nRead = is.read(bytes, nTotalRead, bytes.length - nTotalRead); 
if (nRead > 0) 
nTotalRead = nTotalRead + nRead; 
} 
String str = new String(bytes, 0, nTotalRead, "utf-8"); 
return str; 
} catch (IOException e) { 
e.printStackTrace(); 
return ""; 
} 
}
```

分类：

标签：

[黑客](https://juejin.cn/tag/黑客)