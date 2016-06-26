var BST = require('../../datastructure/binary_search_tree');
var bst = new BST.BinaryTree();

bst.insert(1111);
bst.insert(2222);
bst.insert(1212);
bst.insert(2000);

var node = bst.find(2222);
console.log(node.value);    // 2222

var minNode = bst.findMin();
console.log(minNode.value);    // 1111

var maxNode = bst.findMax();
console.log(maxNode.value);    // 2222
