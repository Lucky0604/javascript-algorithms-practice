/**
 * 重复字符串算法
 *
 * 实现思路
 * 1, 若num小于０，返回空字符串
 * repeat('abc', -2), 返回''
 * 2, 若num大于０，返回重复num次的字符串
 * repeat('abc', 2), 返回'abcabc'
 */

// 方法一
// 循环中使用字符串相加
function repeat(str, num) {
    var result = '';
    while (num > 0) {
        result += str;
        num --;
    }
    return result;
}

// test
console.log(repeat('abc', 3));
// abcabcabc


// 方法二
// 在循环中将字符串str推入一个数组中，然后再通过join()方法连接在一起
function repeat2(str, num) {
    var arr = [];
    for (var i = 0; i < num; i ++) {
        arr.push(str);
    }
    return arr.join('');
}
// test
console.log(repeat2('ab', 3));
// ababab

// 方法二－１
function repeat2_1(str, num) {
    var arr = [];
    for (var i = 0; i <= num;) {
        arr[i ++] = str;
    }
    return arr.join('');
}
//test
console.log(repeat2_1('abab', 2));
// abababab

// 方法三
// 使用new Array()或者Array.apply()结合join()方法，将重复字符串连接到一起
function repeat3(str, num) {
    return (num < 0) ? '' : new Array(num + 1).join(str);
}
// test
console.log(repeat3('ab', 3));
// ababab

// 方法三－１
function repeat3_1(str, num) {
    return Array.apply(null, {
        length: num + 1
    }).join(str);
}
// test
console.log(repeat3_1('cd', 2))
// cdcd



// 方法四
// 使用ES6中的String.prototype.repeat()方法直接实现字符串的连接
function repeat4(str, num) {
    if (num === 0) {
        return str;
    } else if (num > 0) {
        return str.repeat(num);
    } else {
        return '';
    }
    return str;
}
// test
console.log(repeat4('ef', 2));
// efef

// 方法四－１
function repeat4_1(str, num) {
    if (num <= 0) {
        return str.repeat(0)
    } else {
        return str.repeat(num);
    }
}
// test
console.log(repeat4_1('efe', 1));
// efe



// 方法五
// 使用位运算
function repeat5(str, num) {
    num = Number(num);

    var result = '';
    while (true) {
        if (num & 1) {
            result += str;
        }
        num >>>= 1;
        if (num <= 0) {
            break;
        }
        str += str;
    }
    return result;
}
// test
console.log(repeat5('gh', 2))
// ghgh

// 方法五－1
function repeat5_1(str, num) {
    return (1 << (num - 1)).toString(2).replace(/./g, str);
}
//test
console.log(repeat5_1('jk', 2));
// jkjk
