
#### json

``` js
doc = '[{"name": "张三","sex": "男","email": "zhangsan@123.com"},{"name": "李四","sex": "男","email": "lisi@123.com" },{"name": "王五",  "sex": "女", "email": "wangwu@123.com"    }]'
var json = JSON.parse(doc);                
console.log(json)

console.log(json[0].["name"])
console.log(json[0].name);
var jdoc = JSON.stringify(json);

```
