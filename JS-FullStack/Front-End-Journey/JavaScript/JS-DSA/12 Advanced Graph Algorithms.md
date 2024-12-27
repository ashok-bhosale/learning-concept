Let's delve into advanced graph algorithms:

### Dijkstra's Algorithm for Single-Source Shortest Paths:

Dijkstra's algorithm finds the shortest paths from a single source vertex to all other vertices in a weighted graph.

```javascript
function dijkstra(graph, start) {
    const distances = {};
    const visited = {};
    const queue = new PriorityQueue(); // Implement a priority queue

    // Initialize distances and queue
    for (let vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        queue.enqueue(vertex, distances[vertex]);
    }

    // Main loop
    while (!queue.isEmpty()) {
        const { val: current } = queue.dequeue();
        if (!visited[current]) {
            visited[current] = true;
            for (let neighbor in graph[current]) {
                const distance = distances[current] + graph[current][neighbor];
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    queue.enqueue(neighbor, distance);
                }
            }
        }
    }

    return distances;
}

// Example usage:
const graph = {
    A: { B: 4, C: 2 },
    B: { C: 5, D: 10 },
    C: { D: 3 },
    D: {}
};

console.log(dijkstra(graph, 'A')); // Output: { A: 0, B: 4, C: 2, D: 5 }
```

### Bellman-Ford Algorithm for Single-Source Shortest Paths with Negative Weights:

Bellman-Ford algorithm handles graphs with negative weight edges and detects negative cycles.

```javascript
function bellmanFord(graph, start) {
    const distances = {};
    const parents = {};
    const vertices = Object.keys(graph);

    // Initialize distances and parents
    for (let vertex of vertices) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        parents[vertex] = null;
    }

    // Relax edges repeatedly
    for (let i = 0; i < vertices.length - 1; i++) {
        for (let vertex of vertices) {
            for (let neighbor in graph[vertex]) {
                const distance = distances[vertex] + graph[vertex][neighbor];
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    parents[neighbor] = vertex;
                }
            }
        }
    }

    // Check for negative cycles
    for (let vertex of vertices) {
        for (let neighbor in graph[vertex]) {
            if (distances[vertex] + graph[vertex][neighbor] < distances[neighbor]) {
                throw new Error('Graph contains a negative cycle');
            }
        }
    }

    return { distances, parents };
}

// Example usage:
const graphWithNegativeWeights = {
    A: { B: 4, C: 2 },
    B: { C: -5, D: 1 },
    C: { D: 3 },
    D: {}
};

console.log(bellmanFord(graphWithNegativeWeights, 'A'));
```

### Floyd-Warshall Algorithm for All-Pairs Shortest Paths:

Floyd-Warshall algorithm finds the shortest paths between all pairs of vertices in a weighted graph.

```javascript
function floydWarshall(graph) {
    const vertices = Object.keys(graph);
    const distances = {};

    // Initialize distance matrix
    for (let u of vertices) {
        distances[u] = {};
        for (let v of vertices) {
            distances[u][v] = u === v ? 0 : graph[u][v] || Infinity;
        }
    }

    // Main loop
    for (let k of vertices) {
        for (let i of vertices) {
            for (let j of vertices) {
                if (distances[i][k] + distances[k][j] < distances[i][j]) {
                    distances[i][j] = distances[i][k] + distances[k][j];
                }
            }
        }
    }

    return distances;
}

// Example usage:
const graphAllPairs = {
    A: { B: 2, C: 4 },
    B: { C: 1, D: 7 },
    C: { A: 5, D: 2 },
    D: {}
};

console.log(floydWarshall(graphAllPairs));
```

These algorithms are essential tools in graph theory and have applications in various fields like network routing, transportation planning, and resource allocation.