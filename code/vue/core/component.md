# component

#### 导入组件并立刻使用

``` html
<template>
    <section class="menu"> <!--左边的容器 里面加上组件 menus-->
     <menus></menus> <!-- * -->
    </section>
</template>
<script>
  import menus from './menus'; // * 导入刚才我们创建的 menus组件
  export  default {
    components: { // * 注册menus组件，让其可以在template调用
      menus
    }
  };
</script>
```
