/**
   Splay tree
*/
(function(exports) {
    'use strict';

    /**
       Node of the tree

       @public
       @constructor
       @param {Number|String} value Value of the node
       @param {Node} left Left sibling
       @param {Node} right Right sibling
       @param {Node} parent Parent of the node
    */
    exports.Node = function(value, left, right, parent) {
        /**
           @member {Number|String}
        */
        this.value = value;
        this._left = left;
        this._right = right;
        this._parent = parent;
    };

    /**
       Splay tree

       @public
       @constructor
    */
    exports.SplayTree = function() {
        this._root = null;
    };

    /**
       Splays a node to the root.

       @private
       @method
       @param {Node} node Node to be splayed
       @returns {Node} The same node from the parameter, post splayed
    */
    exports.SplayTree.prototype._splay = function(node) {
        while (this._root !== node) {
            var hasParent = node._parent !== null;
            var hasGrandparent = (hasParent && node._parent._parent !== null);
            if (hasParent && hasGrandparent) {
                var isLeftChild = node._parent._left === node;
                var isParentLeftChild = node._parent._parent._left === node._parent;
                if ((isLeftChild && isParentLeftChild) || (!isLeftChild && !isParentLeftChild)) {
                    node = this._zigZig(node);
                } else {
                    node = this._zig(node);
                }
            } else {
                node = this._zig(node);
            }
        };
        return node;
    };


    /**
       Performs a zig-zig splay pattern

       @private
       @method
       @param {Node} node Node to be zig-zig'd
       @returns {Node} The same node from the parameter, post splayed
    */
    exports.SplayTree.prototype._zigZig = function(node) {
        var parent = node._parent;
        var grandParent = node._parent._parent;
        var greatGrandParent = grandParent._parent !== undefined ? grandParent._parent: null;
        var orientation = (parent._right === node) ? '_right': '_left';
        var oppositeOrientation = (orientation === '_left')? '_right': '_left';
        var grandParentOrientation = (greatGrandParent !== null && greatGrandParent._left === grandParent) ? '_left': '_right';
        // fix grandParent & great if it exists / not root
        if (this._root === grandParent) {
            this._root = node;
        } else {
            greatGrandParent[grandParentOrientation] = node;
        }
        grandParent._parent = parent;
        // fix grandParent subtree
        grandParent[orientation] = parent[oppositeOrientation];
        if (grandParent[orientation] !== null) {
            grandParent[orientation]._parent = grandParent;
        }
        // fix parent
        parent[oppositeOrientation] = grandParent;
        parent[orientation] = node[oppositeOrientation];
        if (parent[orientation] !== null) {
            parent[orientation]._parent = parent;
        }
        parent._parent = node;
        // fix current Node
        node[oppositeOrientation] = parent;
        if (node === this._root) {
            node._parent = null;
        } else if (greatGrandParent !== null) {
            node._parent = greatGrandParent;
        }
        return node;
    };

    /**
       Performs a zig-zag splay pattern

       @private
       @method
       @param {Node} node Node to be zig-zag'd
       @returns {Node} The same node from the parameter, post splayed
    */
    exports.SplayTree.prototype._zigZag = function(node) {
        var parent = node._parent;
        var grandParent = parent._parent;
        var greatGrandParent = grandParent._parent !== undefined ? grandParent._parent : null;
        var orientation = (parent._left === node) ? '_left': '_right';
        var oppositeOrientation = (orientation === '_right')? '_left': '_right';
        var grandParentOrientation = (greatGrandParent !== null && greatGrandParent._left === grandParent) ? '_left': '_right';
        // fix grandParent
        if (this._root === grandParent) {
            this._root = node;
        } else {
            greatGrandParent[grandParentOrientation] = node;
        }
        grandParent._parent = node;

        // fix grandParent subtree
        grandParent[oppositeOrientation] = node[orientation];
        if (grandParent[oppositeOrientation] !== null) {
            grandParent[oppositeOrientation]._parent = grandParent;
        }
        // fix parent
        parent[orientation] = node[oppositeOrientation];
        if (parent[orientation] !== null) {
            parent[orientation]._parent = parent;
        }
        parent._parent = node;

        // fix curr node
        node[orientation] = grandParent;
        node[oppositeOrientation] = parent;
        if (this._root === node) {
            node._parent = null;
        } else if (greatGrandParent !== null) {
            node._parent = greatGrandParent;
        }
        return node;
    };

    /**
     * Performs a zig splay parttern
     *
     * @private
     * @method 
     * @param { Node} node Node to be a zig'd
     * @returns { Node} [The same node from the parameter, post splayed]
     */
    exports.SplayTree.prototype._zig = function(node) {
        var parent = node._parent;
        var orientation = (parent._right === node) ? '_right': '_left';
        var oppositeOrientation = (orientation === '_right') ? '_left': '_right';

        if (this._root === parent) {
            this._root = node;
        }

        // fix parent
        parent[orientation] = node[oppositeOrientation];
        if (parent[orientation] !== null) {
            parent[orientation]._parent = parent;
        }
        parent._parent = node;

        // fix cur node
        node[oppositeOrientation] = parent;
        node._parent = null;

        return node;
    };


    /**
     * Insert a node into the splay tree.
     * Time complexity: O(log N) in the average case
     * and amortized O(log n) in the worst case.
     *
     * @public
     * @method 
     * @param {Number|String} [value] [Node value]
     * @param {Node} [current] [Current node]
     */
})
