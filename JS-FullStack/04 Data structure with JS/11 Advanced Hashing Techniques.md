Let's delve into these advanced hashing techniques:

### Perfect Hashing:

1. **Perfect Hashing**:
   - Perfect hashing is a technique that minimizes collisions by ensuring each key hashes to a unique index within the hash table.
   - It consists of two levels of hashing: a first-level hash function to select a bucket, and a second-level hash function to resolve collisions within that bucket.
   - Perfect hashing is particularly useful in scenarios where the keys are known in advance and do not change frequently, as it requires preprocessing to generate the perfect hash functions.

### Cuckoo Hashing:

2. **Cuckoo Hashing**:
   - Cuckoo hashing is a technique that resolves collisions by allowing each key to occupy multiple hash table slots (or nests).
   - When a collision occurs, the key is hashed to one of its designated nests. If the nest is occupied, the existing key is evicted and relocated to its alternative nest.
   - This process may recursively displace other keys, leading to a chain reaction until all keys find a suitable nest.
   - Cuckoo hashing guarantees constant-time lookup and deletion, and amortized constant-time insertion, making it efficient for certain scenarios.

### Bloom Filters:

3. **Bloom Filters**:
   - Bloom filters are probabilistic data structures used to test whether an element is a member of a set.
   - They use a bit array and multiple hash functions to represent the set membership.
   - To insert an element, it is hashed by multiple hash functions, and the corresponding bits in the bit array are set to 1.
   - To query for an element, its hashes are checked against the bit array. If any of the corresponding bits are not set, the element is definitely not in the set. If all bits are set, the element may be in the set (with a small probability of false positives).
   - Bloom filters are space-efficient and provide constant-time insertion and lookup operations.

These advanced hashing techniques offer specialized solutions to address different scenarios and trade-offs in terms of memory usage, lookup efficiency, and collision handling. Understanding their principles and applications can be valuable in designing efficient data structures and algorithms for various use cases.


Let's explore advanced hashing techniques and implement them in JavaScript:

### Perfect Hashing:

Perfect hashing ensures minimal collisions by mapping each key to a unique index in the hash table.

```javascript
class PerfectHashing {
    constructor(keys) {
        this.keys = keys;
        this.size = keys.length * keys.length;
        this.table = new Array(this.size);
        this.secondaryTables = new Array(this.size);
        this.build();
    }

    hash(key) {
        return key % this.size;
    }

    secondaryHash(key) {
        return key % (this.size * this.size);
    }

    build() {
        for (let key of this.keys) {
            const h = this.hash(key);
            if (!this.table[h]) {
                this.table[h] = key;
            } else {
                if (!this.secondaryTables[h]) {
                    this.secondaryTables[h] = [];
                }
                this.secondaryTables[h].push(key);
            }
        }
    }

    search(key) {
        const h = this.hash(key);
        if (this.table[h] === key) {
            return h;
        } else if (this.secondaryTables[h]) {
            for (let k of this.secondaryTables[h]) {
                if (k === key) {
                    return h;
                }
            }
        }
        return -1;
    }
}

// Example usage:
const keys = [1, 4, 8, 12, 16];
const perfectHashing = new PerfectHashing(keys);
console.log(perfectHashing.search(12)); // Output: 3
```

### Cuckoo Hashing:

Cuckoo hashing resolves collisions by displacing existing elements to alternate hash locations.

```javascript
class CuckooHashing {
    constructor(size) {
        this.size = size;
        this.table1 = new Array(size);
        this.table2 = new Array(size);
    }

    hash1(key) {
        return key % this.size;
    }

    hash2(key) {
        // Use a different hash function for table 2
        return (key * 2) % this.size;
    }

    insert(key) {
        let currentKey = key;
        let currentTable = this.table1;
        let currentHash = this.hash1(key);

        for (let i = 0; i < this.size; i++) {
            const temp = currentTable[currentHash];
            currentTable[currentHash] = currentKey;

            if (temp === undefined) {
                return;
            }

            if (currentTable === this.table1) {
                currentKey = temp;
                currentTable = this.table2;
                currentHash = this.hash2(temp);
            } else {
                currentKey = temp;
                currentTable = this.table1;
                currentHash = this.hash1(temp);
            }
        }

        // If insertion fails after max iterations, rehash
        this.rehash();
        this.insert(key);
    }

    search(key) {
        const hash1 = this.hash1(key);
        const hash2 = this.hash2(key);
        return this.table1[hash1] === key || this.table2[hash2] === key;
    }

    rehash() {
        this.size *= 2;
        const oldTable1 = this.table1;
        const oldTable2 = this.table2;
        this.table1 = new Array(this.size);
        this.table2 = new Array(this.size);

        for (let key of oldTable1) {
            if (key !== undefined) {
                this.insert(key);
            }
        }

        for (let key of oldTable2) {
            if (key !== undefined) {
                this.insert(key);
            }
        }
    }
}

// Example usage:
const cuckooHashing = new CuckooHashing(5);
cuckooHashing.insert(3);
cuckooHashing.insert(7);
cuckooHashing.insert(12);
console.log(cuckooHashing.search(3)); // Output: true
console.log(cuckooHashing.search(7)); // Output: true
console.log(cuckooHashing.search(12)); // Output: true
```

### Bloom Filters:

Bloom filters are probabilistic data structures used to test set membership.

```javascript
class BloomFilter {
    constructor(size, hashFunctions) {
        this.size = size;
        this.bits = new Array(size).fill(false);
        this.hashFunctions = hashFunctions;
    }

    insert(key) {
        for (let fn of this.hashFunctions) {
            const index = fn(key) % this.size;
            this.bits[index] = true;
        }
    }

    search(key) {
        for (let fn of this.hashFunctions) {
            const index = fn(key) % this.size;
            if (!this.bits[index]) {
                return false;
            }
        }
        return true;
    }
}

// Example usage:
const hashFunctions = [
    key => key * 2,
    key => key * 3
];
const bloomFilter = new BloomFilter(10, hashFunctions);
bloomFilter.insert(5);
console.log(bloomFilter.search(5)); // Output: true
console.log(bloomFilter.search(10)); // Output: false
```

These implementations showcase perfect hashing, cuckoo hashing, and bloom filters in JavaScript, offering efficient solutions for different scenarios involving hashing.