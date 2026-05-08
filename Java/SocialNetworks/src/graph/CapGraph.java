/**
 * 
 */
package graph;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

/**
 * @author Your name here.
 * 
 * For the warm up assignment, you must implement your Graph in a class
 * named CapGraph.  Here is the stub file.
 *
 */
public class CapGraph implements Graph {

    // Adjacency list: Key is vertex ID, Value is a set of outgoing neighbor IDs
    private Map<Integer, HashSet<Integer>> adjList;

    public CapGraph() {
        adjList = new HashMap<>();
    }
    
	/* (non-Javadoc)
	 * @see graph.Graph#addVertex(int)
	 */
	@Override
	public void addVertex(int num) {
		// TODO Auto-generated method stub
        adjList.putIfAbsent(num, new HashSet<>());
    }


	/* (non-Javadoc)
	 * @see graph.Graph#addEdge(int, int)
	 */
	@Override
	public void addEdge(int from, int to) {
		// TODO Auto-generated method stub
	       if (!adjList.containsKey(from) || !adjList.containsKey(to)) {
	            throw new IllegalArgumentException("Both vertices must exist in the graph.");
	        }
	        adjList.get(from).add(to);
	    }

	/* (non-Javadoc)
	 * @see graph.Graph#getEgonet(int)
	 */
	@Override
	public Graph getEgonet(int center) {
		// TODO Auto-generated method stub
        CapGraph egonet = new CapGraph();
        if (!adjList.containsKey(center)) {
            return egonet;
        }

        // 1. Identify all vertices in the egonet (center + its direct neighbors)
        Set<Integer> egoNodes = new HashSet<>();
        egoNodes.add(center);
        egoNodes.addAll(adjList.get(center));

        // 2. Add these vertices to the new graph
        for (int node : egoNodes) {
            egonet.addVertex(node);
        }

        // 3. Add all edges from the original graph that exist between these nodes
        for (int u : egoNodes) {
            for (int v : adjList.get(u)) {
                if (egoNodes.contains(v)) {
                    egonet.addEdge(u, v);
                }
            }
        }

        return egonet;
    }

	/* (non-Javadoc)
	 * @see graph.Graph#getSCCs()
	 */
	@Override
	public List<Graph> getSCCs() {
		// TODO Auto-generated method stub
        List<Graph> sccs = new ArrayList<>();
        Stack<Integer> stack = new Stack<>();
        Set<Integer> visited = new HashSet<>();

        // Step 1: Fill stack with vertices according to their finishing times (DFS)
        for (int vertex : adjList.keySet()) {
            if (!visited.contains(vertex)) {
                fillOrder(vertex, visited, stack);
            }
        }

        // Step 2: Transpose the graph (reverse all edges)
        CapGraph transposedGraph = getTranspose();

        // Step 3: Process vertices in order defined by stack on the transposed graph
        visited.clear();
        while (!stack.isEmpty()) {
            int v = stack.pop();
            if (!visited.contains(v)) {
                Set<Integer> componentNodes = new HashSet<>();
                transposedGraph.findSCC(v, visited, componentNodes);
                
                // Create a new Graph object for this SCC
                sccs.add(buildSubGraph(componentNodes));
            }
        }

        return sccs;
    }

	/* (non-Javadoc)
	 * @see graph.Graph#exportGraph()
	 */
	@Override
	public HashMap<Integer, HashSet<Integer>> exportGraph() {
		// TODO Auto-generated method stub
        // Create a deep copy for grading export
        HashMap<Integer, HashSet<Integer>> exported = new HashMap<>();
        for (int v : adjList.keySet()) {
            exported.put(v, new HashSet<>(adjList.get(v)));
        }
        return exported;
    }
	
    // Helper for Step 1 of Kosaraju's
    private void fillOrder(int v, Set<Integer> visited, Stack<Integer> stack) {
        visited.add(v);
        for (int neighbor : adjList.get(v)) {
            if (!visited.contains(neighbor)) {
                fillOrder(neighbor, visited, stack);
            }
        }
        stack.push(v);
    }

    // Helper for Step 2 of Kosaraju's (Transposing)
    private CapGraph getTranspose() {
        CapGraph transposed = new CapGraph();
        for (int v : adjList.keySet()) transposed.addVertex(v);
        for (int u : adjList.keySet()) {
            for (int v : adjList.get(u)) {
                transposed.addEdge(v, u);
            }
        }
        return transposed;
    }

    // Helper for Step 3 of Kosaraju's (DFS on transposed)
    private void findSCC(int v, Set<Integer> visited, Set<Integer> componentNodes) {
        visited.add(v);
        componentNodes.add(v);
        for (int neighbor : adjList.get(v)) {
            if (!visited.contains(neighbor)) {
                findSCC(neighbor, visited, componentNodes);
            }
        }
    }

    // Creates a new graph containing only the specified nodes and the original edges between them
    private Graph buildSubGraph(Set<Integer> nodes) {
        CapGraph sub = new CapGraph();
        for (int n : nodes) sub.addVertex(n);
        for (int u : nodes) {
            for (int v : adjList.get(u)) {
                if (nodes.contains(v)) {
                    sub.addEdge(u, v);
                }
            }
        }
        return sub;
    }	
	

}
