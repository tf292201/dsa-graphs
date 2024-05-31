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


  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);

  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.nodes.add(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    vertex.adjacent.forEach(adjacentVertex => {
      adjacentVertex.adjacent.delete(vertex);
    });
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let visited = new Set();
    let result = [];

    while (stack.length) {
      let current = stack.pop();

      if (!visited.has(current)) {
        visited.add(current);
        result.push(current.value);

        // Sort adjacent nodes to ensure consistent order
        Array.from(current.adjacent).sort((a, b) => a.value.localeCompare(b.value)).forEach(neighbor => {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        });
      }
    }

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let visited = new Set();
    let result = [];

    while (queue.length) {
      let current = queue.shift();

      if (!visited.has(current)) {
        visited.add(current);
        result.push(current.value);

        current.adjacent.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
    }

    return result;
  }
}

module.exports = {Graph, Node}