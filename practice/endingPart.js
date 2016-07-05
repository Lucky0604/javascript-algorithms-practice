/**
 * 字尾确认
 *
 * 1, 运用String.prototype.substr()，来识别str结尾的字符
 * 2, 声明变量endingPart是str字符的最后字符，最后字符的长度等于target的长度
 * 3, 如果target === endingPart 返回true,否则返回false
 *
 * 其中endingPart需要具备的条件:
 * 1, endingPart是一个字符串，而且是str末尾的字符串（从str最右边向最左边截取）
 * 2, endingPart的长度和target字符长度相等
 */

// 使用substr方法
// 通过target.length可以知道目标字符的长度，如此一来，通过就知道截取的字符串长度。
// 根据substr()方法，可以通过-target.length或者str.length - target.lengt获取到对应的字符串。比如：
function end(str, target) {
    var endingPart = str.substr(-(target.length));
    return target === endingPart;
}
// test
console.log(end('TEST', 'T'));
// true
console.log(end('TEST', 'E'));
// false

// 简化为
function end1(str, target) {
    return target === str.substr(str.length - target.length);
}
// test
console.log(end1('TEST', 'T'));
// true
console.log(end1('TEST', 'E'));
// false

// 另外一种情况，如果target是一个空字符串呢？
// 那么这个时候，也希望函数返回的是false。那么可以在上面的基础做一个简单的修改：
function end3(str, target) {
    return target.length > 0 && target === str.substr(str.length - target.length);
}
// test
console.log(end3('TEST', ''));
// false
console.log(end3('TEST', 'T'));
// true
console.log(end3('TEST', 'E'));
// false




// 使用slice方法
function end4(str, target) {
    var endingPart = str.slice(-(target.length));
    return target === endingPart;
}
// test
console.log(end4('TEST', 'T'));
// true
console.log(end4('TEST', 'E'));
// false



// 使用indexOf方法
function end5(str, target) {
    var endingPart = str.indexOf(target, str.length - target.length);
    return endingPart !== -1;
}
// test
console.log(end5('TEST', 'T'));
// true
console.log(end5('TEST', 'E'));
// false



// 使用lastIndexOf方法
function end6(str, target) {
    var endingPart = str.lastIndexOf(target);
    return endingPart === str.length - target.length;
}
// test
console.log(end6('TEST', 'T'));
// true
console.log(end6('TEST', 'E'));
// false



// 使用ES6中原生方法endsWith
function end7(str, target) {
    return str.endsWith(target) ? true: false;
}
//test
console.log(end7('TEST', 'E'));
// false
console.log(end7('TEST', 'T'));
// true
