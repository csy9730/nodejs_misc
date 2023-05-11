# table操作


## base

api 列表
* 插入行
* 删除行
* 插入格子
* 删除格子
* 文本可编辑
* 

``` javascript
tableObject.deleteRow(index)

```

``` js
var oTable = document.getElementById("oTable");
var tBodies = oTable.tBodies;
var tbody = tBodies[0];
var tr = tbody.insertRow(tbody.rows.length);
var td_1 = tr.insertCell(0);
td_1.innerHTML = "<div contenteditable= 'true'<第1列>\/div>";
// &quot;&lt;div contenteditable=&#39;true&#39;&gt;第1列&lt;\/div&gt;&quot;;
var td_2 = tr.insertCell(1);
td_2.innerHTML = "<div contenteditable='true' <第3列>\/div>";
// &quot;&lt;div contenteditable=&#39;true&#39;&gt;第2列&lt;\/div&gt;&quot;;
```

### misc



### form
``` html
<script>
 function insertStu(){  
     document.getElementById('myForm').action = "ctl.jsp?op=insert";  
     document.getElementById("myForm").submit();  
 } 	
</script>	    

<form id="myForm" action="" method="post">
     <input type="button" name="qurray" value="查询" onclick="selectStu()" />
     <input type="button" name="updata" value="修改" onclick="modifyStu()" />
     <input type="button" value="添加" onclick="insertStu()" />
     <input type="button" name="del" value="删除" onclick="deleteStu()" />    
</form>
```

也可以把js语句直接写在input按钮的 onclick 里：

 ``` html
  <form name="form1" action=""> 
      <input type="button" value="action1" onclick="form1.action='1';form1.submit();"> 
      <input type="button" value="action2" onclick="form1.action='2';form1.submit();"> 
 </form>
 ```


