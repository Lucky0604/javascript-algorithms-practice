/**
 * Binary search tree
 *
 */
(function(exports) {
    'use strict';

    /**
     * Node of the tree.
     *
     * @public
     * @constructor
     * @param {Number | String} value Value of the node.
     * @param {Node} left Left sibling
     * @param {Node} right Right sibling
     * @param {Node} parent Parent of the node
     */

    exports.Node = function(value, left, right, parent) {
        /**
         * @member {Number|String}
         */
        this.value = value;
        this._left = left;
        this._right = right;
        this._parent = parent;
    }

    /**
     * Binary tree
     *
     * @public
     * @constructor
     */

    exports.BinaryTree = function() {
        this._root = null;
    }

    /**
     * Inserts a node into the binary search tree.
     * Time complexity: O(log N) in the average case
     * and O(N) in the worst case.
     *
     * @public
     * @method
     * @param {Number|String} value Node value
     * @param {Node} current Current node.
     */
    exports.BinaryTree.prototype.insert = function(value, current) {
        if (this._root === null) {
            this._root = new exports.Node(value, null, null, null);
            return;
        }
        var insertKey;
        current = current || this._root;
        if (current.value > value) {
            insertKey = '_left';
        } else {
            insertKey = '_right';
        }
        if (!current[insertKey]) {
            current[insertKey] = new exports.Node(value, null, null, current);
        } else {
            this.insert(value, current[insertKey]);
        }
    };

    /**
     * In-order traversal from the given node.
     *
     * @private
     * @param {Node} current Node from which to start the traversal
     * @param {Function} callback Callback which will be called for each traversal node.
     */
    exports.BinaryTree.prototype._inorder = function(current, callback) {
        if (!current) {
            return;
        }
        this._inorder(current._left, callback);
        if (typeof callback === 'function') {
            callback(current);
        }
        this._inorder(current._right, callback);
    };


    /**
     * In-order traversal of the whole binary search tree.
     *
     * @public
     * @method
     * @param {Function} callback Callback which will be called for each traversed node.
     */
    exports.BinaryTree.prototype.inorder = function(callback) {
        return this._inorder(this._root, callback);
    };


    /**
     * Post-order traversal from given node.
     *
     * @private
     * @param {Node} current Node from which to start the traversal
     * @param {Function} callback Callback which will be called for each traversed node
     */
    exports.BinaryTree.prototype._postorder = function(current, callback) {
        if (!current) {
            return;
        }
        this._postorder(current._left, callback);
        this._postorder(current._right, callback);
        if (typeof callback === 'function') {
            callback(current);
        }
    };

    /**
     * Post-order traversel of the whole tree
     *
     * @public
     * @param {Function} callback Callback which will be called for each traversed node.
     */
    exports.BinaryTree.prototype.postorder = function(callback) {
        return this._postorder(this._root, callback);
    };

    /**
     * Pre-order traversal of the tree from given node.
     *
     * @private
     * @param {Node} current Node from which to start the traversal.
     * @param {Function} callback Callback which will be called for each traversed node.
     */
    exports.BinaryTree.prototype._preorder = function(current, callback) {
        if (!current) {
            return;
        }
        if (typeof callback === 'function') {
            callback(current);
        }
        this._preorder(current._left, callback);
        this._preorder(current._right, callback);
    };

    /**
     * Pre-order preorder traversal of the whole tree.
     *
     * @public
     * @param {Function} callback Callback which will be called for each traversed node.
     */
    exports.BinaryTree.prototype.preorder = function(callback) {
        return this._preorder(this._root, callback);
    };

    /**
     * Finds a node by it's value
     * Average time complexity: O(log N)
     *
     * @public
     * @param {Number | String} value of the node which should be found.
     */
    exports.BinaryTree.prototype.find = function(value) {
        return this._find(value, this._root);
    };

    /**
     * Finds a node by it's value in a given sub-tree
     * Average time complexity: O(log N)
     *
     * @private
     * @param {Number | String} value of the node which should be found.
     * @param {Node} current node to be checked.
     */
    exports.BinaryTree.prototype._find = function(value, current) {
        if (!current) {
            return null;
        }
        if (current.value === value) {
            return current;
        }
        if (current.value > value) {
            return this._find(value, current._left);
        }
        if (current.value < value) {
            return this._find(value, current._right);
        }
    };

    
    /**
     * replace given child with new one. for given parent.
     *
     * @private
     * @param {Node} parent Parent node.
     * @param {Node} oldChild Child to be replaced
     * @param {Node} newChild Child replacement
     */
    exports.BinaryTree.prototype._replaceChild = function(parent, oldChild, newChild) {
        if (!parent) {
            this._root = newChild;
            if (this._root !== null) {
                this._root._parent = null;
            }
        } else {
            if (parent._left === oldChild) {
                parent._left = newChild;
            } else {
                parent._right = newChild;
            }
            if (newChild) {
                newChild._parent = parent;
            }
        }
    };


    /**
     * Removes node from the tree.
     * Average runtime complexity: O(log N)
     *
     * @public
     * @param {Node} node to be removed
     * @returns {Boolean} True/false depending on whether the given node is removed.
     */
    exports.BinaryTree.prototype.remove = function(node) {
        if (!node) {
            return false;
        }
        if (node._left && node._right) {
            var min = this._findMin(node._right);
            var temp = node.value;
            node.value = min.value;
            min.value = temp;
            return this.remove(min);
        } else {
            if (node._left) {
                this._replaceChild(node._parent, node, node._left);
            } else if (node._right) {
                this._replaceChild(node._parent, node, node._right);
            } else {
                this._replaceChild(node._parent, node, null);
            }
            return true;
        }
    };

    
    /**
     * Finds the node with minium value in given sub-tree
     * 
     * @private
     * @param {Node} node Root of the sub-tree
     * @param {Number | String} current Current minium value of the sub-tree
     * @return {Node} Node with the minium value in the sub-tree
     */
    exports.BinaryTree.prototype._findMin = function(node, current) {

        current = current || {value: Infinity};
        if (!node) {
            return current;
        }
        if (current.value > node.value) {
            current = node;
        }
        return this._findMin(node._left, current);
    };


    /**
     * Finds the node with maximum value in the given sub-tree
     *
     * @private
     * @param {Node} node Root of the sub-tree
     * @param {Number|String} current Current maximum value of the sub-tree
     * @returns {Node} Node with the maximum value in the sub-tree
     */
    exports.BinaryTree.prototype._findMax = function(node, current) {

        current = current || {value: -Infinity};
        if (!node) {
            return current;
        }
        if (current.value < node.value) {
            current = node;
        }
        return this._findMax(node._right, current);
    };


    /**
     * Finds the node with minium value in the whole tree
     *
     * @public
     * @returns {Node} The minium node of the tree.
     */
    exports.BinaryTree.prototype.findMin = function() {
        return this._findMin(this._root);
    };

    /**
     * Finds the node with maximum value in the whole tree.
     *
     * @public
     * @returns {Node} The maximum node of the tree
     */
    exports.BinaryTree.prototype.findMax = function() {
        return this._findMax(this._root);
    };

})
