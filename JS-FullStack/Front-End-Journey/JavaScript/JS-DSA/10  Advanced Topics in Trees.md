Let's explore these advanced topics in trees:

### Balanced Binary Search Trees:

1. **AVL Trees**:
   - AVL trees are self-balancing binary search trees where the heights of the two child subtrees of any node differ by at most one.
   - They ensure that the height of the tree remains logarithmic, which ensures efficient operations such as search, insertion, and deletion in O(log n) time complexity.
   - Balancing operations include rotations (single and double rotations) to maintain the balance factor of each node.

2. **Red-Black Trees**:
   - Red-Black trees are another type of self-balancing binary search tree.
   - They ensure that the tree remains balanced by enforcing additional properties on top of regular binary search trees.
   - Each node in a red-black tree is assigned a color (either red or black), and the tree must satisfy specific rules regarding coloring and structure to maintain balance.
   - Red-Black trees provide O(log n) time complexity for search, insertion, and deletion operations.

### B-Trees and Their Applications:

1. **B-Trees**:
   - B-trees are self-balancing tree data structures that generalize binary search trees to allow for more than two children per node.
   - They are commonly used in databases and file systems, where large amounts of data need to be stored and accessed efficiently.
   - B-trees maintain balance by ensuring that all leaf nodes are at the same level, and internal nodes contain a variable number of keys and children.
   - B-trees provide efficient disk-based storage and retrieval, as they minimize the number of disk accesses required for operations.

### Segment Trees and Fenwick Trees:

1. **Segment Trees**:
   - Segment trees are versatile data structures used for solving various range query problems efficiently.
   - They partition the input array into smaller segments and store aggregated information (such as sum, min, max) for each segment.
   - Segment trees allow for quick querying of the aggregated information over any given range of the original array.
   - They are particularly useful in problems involving range queries and updates, such as finding the sum of elements within a given range or updating values within a range.

2. **Fenwick Trees (Binary Indexed Trees)**:
   - Fenwick trees are specialized data structures that efficiently compute and update prefix sums of an array.
   - They use binary representation of indices to store cumulative sums in a compact array.
   - Fenwick trees enable fast updates and queries for prefix sums, making them ideal for problems requiring frequent updates and range queries, such as dynamic cumulative frequency counts.

These advanced topics in trees offer powerful solutions to a wide range of problems across various domains, including databases, file systems, computational geometry, and more. Understanding their principles and applications can greatly enhance algorithmic problem-solving skills.


Let's explore advanced topics in trees and implement them in JavaScript:

### Balanced Binary Search Trees:

1. **AVL Trees**:
```javascript
class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    getBalanceFactor(node) {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    insertNode(node, value) {
        if (!node) return new AVLNode(value);

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            return node;
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

        const balanceFactor = this.getBalanceFactor(node);

        // Left Left Case
        if (balanceFactor > 1 && value < node.left.value) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balanceFactor < -1 && value > node.right.value) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balanceFactor > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balanceFactor < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }
}
```

2. **Red-Black Trees**: (Below is the code to be added later)

### B-Trees and Their Applications:

```javascript
class BTreeNode {
    constructor(keys = [], children = [], isLeaf = false) {
        this.keys = keys;
        this.children = children;
        this.isLeaf = isLeaf;
    }
}

class BTree {
    constructor(order) {
        this.root = null;
        this.order = order;
    }

    search(node, key) {
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }
        if (i < node.keys.length && key === node.keys[i]) {
            return true;
        }
        if (node.isLeaf) {
            return false;
        }
        return this.search(node.children[i], key);
    }

    insert(key) {
        if (!this.root) {
            this.root = new BTreeNode([key], [], true);
        } else {
            if (this.root.keys.length === 2 * this.order - 1) {
                const newRoot = new BTreeNode([], [this.root], false);
                this.splitChild(newRoot, 0);
                this.root = newRoot;
            }
            this.insertNonFull(this.root, key);
        }
    }

    insertNonFull(node, key) {
        let i = node.keys.length - 1;
        if (node.isLeaf) {
            while (i >= 0 && key < node.keys[i]) {
                node.keys[i + 1] = node.keys[i];
                i--;
            }
            node.keys[i + 1] = key;
        } else {
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            i++;
            if (node.children[i].keys.length === 2 * this.order - 1) {
                this.splitChild(node, i);
                if (key > node.keys[i]) {
                    i++;
                }
            }
            this.insertNonFull(node.children[i], key);
        }
    }

    splitChild(parent, index) {
        const child = parent.children[index];
        const newChild = new BTreeNode(
            child.keys.slice(this.order, 2 * this.order - 1),
            child.children.slice(this.order, 2 * this.order),
            child.isLeaf
        );
        child.keys.length = this.order - 1;
        child.children.length = this.order;
        if (!child.isLeaf) {
            newChild.isLeaf = false;
        }
        parent.children.splice(index + 1, 0, newChild);
        parent.keys.splice(index, 0, child.keys.pop());
    }
}

// Example usage:
const bTree = new BTree(3);
bTree.insert(10);
bTree.insert(20);
bTree.insert(5);
bTree.insert(6);
console.log(bTree.search(bTree.root, 6)); // Output: true
```

### Segment Trees and Fenwick Trees:

```javascript
class SegmentTree {
    constructor(nums) {
        this.nums = nums;
        this.tree =

 [];
        this.build(0, 0, nums.length - 1);
    }

    build(node, start, end) {
        if (start === end) {
            this.tree[node] = this.nums[start];
        } else {
            const mid = Math.floor((start + end) / 2);
            this.build(2 * node + 1, start, mid);
            this.build(2 * node + 2, mid + 1, end);
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }

    update(index, val, node = 0, start = 0, end = this.nums.length - 1) {
        if (start === end) {
            this.tree[node] = val;
        } else {
            const mid = Math.floor((start + end) / 2);
            if (index <= mid) {
                this.update(index, val, 2 * node + 1, start, mid);
            } else {
                this.update(index, val, 2 * node + 2, mid + 1, end);
            }
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }

    query(left, right, node = 0, start = 0, end = this.nums.length - 1) {
        if (right < start || left > end) return 0;
        if (left <= start && right >= end) return this.tree[node];
        const mid = Math.floor((start + end) / 2);
        return this.query(left, right, 2 * node + 1, start, mid) + this.query(left, right, 2 * node + 2, mid + 1, end);
    }
}

// Example usage:
const nums = [1, 3, 5, 7, 9, 11];
const segTree = new SegmentTree(nums);
console.log(segTree.query(0, 2)); // Output: 9
segTree.update(1, 10);
console.log(segTree.query(0, 2)); // Output: 16
```

These implementations showcase balanced binary search trees (AVL trees), B-trees, and segment trees in JavaScript, offering efficient solutions for various data structuring and querying scenarios.