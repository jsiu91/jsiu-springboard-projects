class Node {
	constructor (val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinarySearchTree {
	constructor (root = null) {
		this.root = root;
	}

	/** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

	insert (val) {
		if (!this.root) {
			this.root = new Node(val);
			return this;
		}

		let current = this.root;
		let newNode = new Node(val);
		while (true) {
			if (val < current.val) {
				if (!current.left) {
					current.left = newNode;
					return this;
				} else {
					current = current.left;
				}
			} else if (val > current.val) {
				if (!current.right) {
					current.right = newNode;
					return this;
				} else {
					current = current.right;
				}
			}
		}
	}

	/** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

	insertRecursively (val, current = this.root) {
		if (!this.root) {
			this.root = new Node(val);
			return this;
		}

		if (val < current.val) {
			if (!current.left) {
				current.left = new Node(val);
				return this;
			}
			return this.insertRecursively(val, current.left);
		} else {
			if (!current.right) {
				current.right = new Node(val);
				return this;
			}
			return this.insertRecursively(val, current.right);
		}
	}

	/** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

	find (val) {
		let current = this.root;

		while (current) {
			if (current.val === val) return current;

			current = val < current.val ? current.left : current.right;
		}

		return undefined;
	}

	/** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

	findRecursively (val, current = this.root) {
		if (!current) return undefined;
		if (current.val === val) return current;
		if (val < current.val) {
			if (!current.left) return undefined;
			return this.findRecursively(val, current.left);
		} else {
			if (!current.right) return undefined;
			return this.findRecursively(val, current.right);
		}
	}

	/** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

	dfsPreOrder () {
		let visitedNode = [];

		function traverse (node) {
			visitedNode.push(node.val);
			node.left && traverse(node.left);
			node.right && traverse(node.right);
		}

		traverse(this.root);
		return visitedNode;
	}

	/** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

	dfsInOrder () {
		let visitedNode = [];

		function traverse (node) {
			node.left && traverse(node.left);
			visitedNode.push(node.val);
			node.right && traverse(node.right);
		}

		traverse(this.root);
		return visitedNode;
	}

	/** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

	dfsPostOrder () {
		let visitedNode = [];

		function traverse (node) {
			node.left && traverse(node.left);
			node.right && traverse(node.right);
			visitedNode.push(node.val);
		}

		traverse(this.root);
		return visitedNode;
	}

	/** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

	bfs () {
		let visitedNode = [];
		let queue = [];
		let current = this.root;

		queue.push(current);

		while (queue.length) {
			current = queue.shift();

			visitedNode.push(current.val);

			if (current.left) queue.push(current.left);
			if (current.right) queue.push(current.right);
		}
		return visitedNode;
	}

	/** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

	remove (val) {
		let nodeToRemove = this.root;
		let parent;

		while (nodeToRemove.val !== val) {
			parent = nodeToRemove;
			if (val < nodeToRemove.val) {
				nodeToRemove = nodeToRemove.left;
			} else {
				nodeToRemove = nodeToRemove.right;
			}
		}

		if (nodeToRemove !== this.root) {
			if (nodeToRemove.left === null && nodeToRemove.right === null) {
				if (parent.left === nodeToRemove) {
					parent.left = null;
				} else {
					parent.right = null;
				}
			} else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
				let rightParent = nodeToRemove;
				let right = nodeToRemove.right;
				if (right.left === null) {
					right.left = nodeToRemove.left;
					if (parent.left === nodeToRemove) {
						parent.left = right;
					} else {
						parent.right = right;
					}
				} else {
					while (right.left !== null) {
						rightParent = right;
						right = right.left;
					}
					if (parent.left === nodeToRemove) {
						parent.left.val = right.val;
					} else {
						parent.right.val = right.val;
					}
					if (right.right !== null) {
						rightParent.left = right.right;
					} else {
						rightParent.left = null;
					}
				}
			} else {
				if (parent.left === nodeToRemove) {
					if (nodeToRemove.right === null) {
						parent.left = nodeToRemove.left;
					} else {
						parent.left = nodeToRemove.right;
					}
				} else {
					if (nodeToRemove.right === null) {
						parent.right = nodeToRemove.left;
					} else {
						parent.right = nodeToRemove.right;
					}
				}
			}
		}
		return nodeToRemove;
	}

	/** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

	isBalanced (current = this.root) {
		if (current === null) return;
		return maxDepth(current) - minDepth(current) <= 1;

		function minDepth (current) {
			if (current === null) return 0;
			return 1 + Math.min(minDepth(current.left), minDepth(current.right));
		}

		function maxDepth (current) {
			if (current === null) return 0;
			return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
		}
	}

	/** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

	findSecondHighest (current = this.root) {
		// if the tree is too small, return
		if (!this.root || (!this.root.left && !this.root.right)) return;

		while (current) {
			// Current is largest and has a left subtree and 2nd largest is the largest in that subtree
			if (current.left && !current.right) {
				return this.findSecondHighest(current.left);
			}
			// Current is parent of largest and largest has no children so current is 2nd largest
			if (current.right && (!current.right.left && !current.right.right)) {
				return current.val;
			}
			current = current.right;
		}
	}

	dfsInOrderIterative () {
		let cur = this.root;
		let stack = [];
		let dfs = [];
		while (stack.length > 0 || cur) {
			while (cur) {
				stack.push(cur);
				cur = cur.left;
			}
			cur = stack.pop();
			if (cur) {
				dfs.push(cur.val);
				cur = cur.right;
			}
		}
		return dfs;
	}
}

module.exports = BinarySearchTree;
