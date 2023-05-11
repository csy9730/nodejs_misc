for (var i = 0; i <10; i++) {  
    setTimeout(function() {  // 同步注册回调函数到 异步的 宏任务队列。
      console.log(i);        // 执行此代码时，同步代码for循环已经执行完成
    }, 0);
  }
// 输出结果
//  10   共10个
// 这里面的知识点： JS的事件循环机制，setTimeout的机制等
// var 原理类似 lazy evaluation？，let类似 eager evaluation？
// setTimeout注册了异步函数，异步访问变量涉及了变量的生存周期变化和访问权限。

for (let j = 10; j <20; j++) {  
    setTimeout(function() {  // 同步注册回调函数到 异步的 宏任务队列。
      console.log(j);        // 执行此代码时，同步代码for循环已经执行完成
    }, 0);
}

ff()
function ff(){
    for (let k = 20; k <30; k++) {  
        setTimeout(function() {  
          console.log(k);  
        }, 0);
    }
};