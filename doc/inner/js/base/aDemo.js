{
	var j = 9;
}
console.log(j);  // 9
{ 
    let i = 9;     // i变量只在 花括号内有效！！！
} 
console.log(i);  // Uncaught ReferenceError: i is not defined
