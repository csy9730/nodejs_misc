# table����


## base

api �б�
* ������
* ɾ����
* �������
* ɾ������
* �ı��ɱ༭
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
td_1.innerHTML = "<div contenteditable= 'true'<��1��>\/div>";
// &quot;&lt;div contenteditable=&#39;true&#39;&gt;��1��&lt;\/div&gt;&quot;;
var td_2 = tr.insertCell(1);
td_2.innerHTML = "<div contenteditable='true' <��3��>\/div>";
// &quot;&lt;div contenteditable=&#39;true&#39;&gt;��2��&lt;\/div&gt;&quot;;
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
     <input type="button" name="qurray" value="��ѯ" onclick="selectStu()" />
     <input type="button" name="updata" value="�޸�" onclick="modifyStu()" />
     <input type="button" value="���" onclick="insertStu()" />
     <input type="button" name="del" value="ɾ��" onclick="deleteStu()" />    
</form>
```

Ҳ���԰�js���ֱ��д��input��ť�� onclick �

 ``` html
  <form name="form1" action=""> 
      <input type="button" value="action1" onclick="form1.action='1';form1.submit();"> 
      <input type="button" value="action2" onclick="form1.action='2';form1.submit();"> 
 </form>
 ```


