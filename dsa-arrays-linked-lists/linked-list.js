/** Node: node for a singly linked list. */

class Node {
	constructor (val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor (vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push (val) {
		let newNode = new Node(val);

		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
	}

	/** unshift(val): add new value to start of list. */

	unshift (val) {
		let newNode = new Node(val);

		if (this.head === null) {
			this.head = newNode;
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}

		if (this.length === 0) this.tail = this.head;

		this.length++;
	}

	/** pop(): return & remove last item. */

	pop () {
		return this.removeAt(this.length - 1);
	}

	/** shift(): return & remove first item. */

	shift () {
		return this.removeAt(0);
	}

	_getAt (idx) {
		let counter = 0;
		let node = this.head;

		while (node) {
			if (counter === idx) {
				return node;
			}
			counter++;
			node = node.next;
		}
		return null;
	}

	/** getAt(idx): get val at idx. */

	getAt (idx) {
		return this._getAt(idx).val;
	}
	/** setAt(idx, val): set val at idx to val */

	setAt (idx, val) {
		if (idx >= this.length || idx < 0) {
			throw new Error('Invalid index');
		}

		let node = this._getAt(idx);
		node.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt (idx, val) {
		if (!this.head) {
			this.head = new Node(val);
			this.tail = this.head;
			this.length++;
			return;
		}

		if (idx === 0) {
			this.head.next = this.head;
			this.head = new Node(val);
			this.length++;
			return;
		}

		if (idx === this.length) {
			let newNode = new Node(val);
			this.tail.next = newNode;
			this.tail = newNode;
		}

		const prev = this._getAt(idx - 1);
		let newNode = new Node(val);
		newNode.next = prev.next;
		prev.next = newNode;
		this.length++;

		return this.head;
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt (idx) {
		if (idx >= this.length || idx < 0) {
			throw new Error('Invalid index');
		}
		// remove from the head
		if (idx === 0) {
			let val = this.head.val;
			this.head = this.head.next;
			this.length--;
			if (this.length < 2) this.tail = this.head;
			return val;
		}

		let previous = this._getAt(idx - 1);

		// remove from the tail
		if (idx === this.length - 1) {
			let val = previous.next.val;
			previous.next = null;
			this.tail = previous;
			this.length--;
			return val;
		}

		let val = previous.next.val;
		previous.next = previous.next.next;
		this.length--;
		return val;
	}

	/** average(): return an average of all values in the list */

	average () {
		if (this.length === 0) return 0;

		let total = 0;
		let node = this.head;

		while (node) {
			total += node.val;
			node = node.next;
		}

		return total / this.length;
	}
}

module.exports = LinkedList;
