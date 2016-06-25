var LL = require('../../datastructure/linked-list.js');
var linkedList = new LL.LinkedList();
linkedList.push({
    name: 'John',
    birthYear: 1981
});
linkedList.push({
    name: 'Pavlo',
    birthYear: 2000
});
linkedList.push({
    name: 'Garry',
    birthYear: 1989
});
console.log(linkedList.shift().data);
console.log(linkedList.pop().data);
