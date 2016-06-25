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



})
