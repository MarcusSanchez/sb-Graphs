class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Add a vertex to the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Add multiple vertices to the graph
  addVertices(vertexArray) {
    vertexArray.forEach(v => this.addVertex(v));
  }

  // Add an edge between two vertices
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // Remove an edge between two vertices
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // Remove a vertex from the graph along with its edges
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    this.nodes.forEach(v => v.adjacent.delete(vertex));
  }

  // Perform depth-first search starting from a given vertex
  depthFirstSearch(start) {
    const visited = new Set();
    const res = [];

    function dfs(v) {
      if (!v || visited.has(v)) return;

      visited.add(v);
      res.push(v.value);

      v.adjacent.forEach(neighbor => dfs(neighbor));
    }

    dfs(start);

    return res;
  }

  // Perform breadth-first search starting from a given vertex
  breadthFirstSearch(start) {
    const visited = new Set();
    const res = [];
    const q = [start];

    visited.add(start);

    while (q.length > 0) {
      const curr = q.shift();
      res.push(curr.value);

      curr.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          q.push(neighbor);
        }
      });
    }

    return res;
  }
}

module.exports = { Graph, Node };