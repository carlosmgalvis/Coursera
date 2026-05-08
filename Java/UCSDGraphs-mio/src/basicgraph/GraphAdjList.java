package basicgraph;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** A class that implements a directed graph. 
 * The graph may have self-loops, parallel edges. 
 * Vertices are labeled by integers 0 .. n-1
 * and may also have String labels.
 * The edges of the graph are not labeled.
 * Representation of edges via adjacency lists.
 * 
 * @author UCSD MOOC development team and YOU
 *
 */
public class GraphAdjList extends Graph {


	private Map<Integer,ArrayList<Integer>> adjListsMap;
	
	/** 
	 * Create a new empty Graph
	 */
	public GraphAdjList () {
		adjListsMap = new HashMap<Integer,ArrayList<Integer>>();
	}

	/** 
	 * Implement the abstract method for adding a vertex. 
	 */
	public void implementAddVertex() {
		int v = getNumVertices();
		ArrayList<Integer> neighbors = new ArrayList<Integer>();
		adjListsMap.put(v,  neighbors);
	}
	
	/** 
	 * Implement the abstract method for adding an edge.
	 * @param v the index of the start point for the edge.
	 * @param w the index of the end point for the edge.  
	 */
	public void implementAddEdge(int v, int w) {
		(adjListsMap.get(v)).add(w);

	}
	
	/** 
	 * Implement the abstract method for finding all 
	 * out-neighbors of a vertex.
	 * If there are multiple edges between the vertex
	 * and one of its out-neighbors, this neighbor
	 * appears once in the list for each of these edges.
	 * 
	 * @param v the index of vertex.
	 * @return List<Integer> a list of indices of vertices.  
	 */	
	public List<Integer> getNeighbors(int v) {
		return new ArrayList<Integer>(adjListsMap.get(v));
	}

	/** 
	 * Implement the abstract method for finding all 
	 * in-neighbors of a vertex.
	 * If there are multiple edges from another vertex
	 * to this one, the neighbor
	 * appears once in the list for each of these edges.
	 * 
	 * @param v the index of vertex.
	 * @return List<Integer> a list of indices of vertices.  
	 */	
	public List<Integer> getInNeighbors(int v) {
		List<Integer> inNeighbors = new ArrayList<Integer>();
		for (int u : adjListsMap.keySet()) {
			//iterate through all edges in u's adjacency list and 
			//add u to the inNeighbor list of v whenever an edge
			//with startpoint u has endpoint v.
			for (int w : adjListsMap.get(u)) {
				if (v == w) {
					inNeighbors.add(u);
				}
			}
		}
		return inNeighbors;
	}
	 

	/** 
	 * Implement the abstract method for finding all 
	 * vertices reachable by two hops from v.
	 * 
	 * @param v the index of vertex.
	 * @return List<Integer> a list of indices of vertices.  
	 */		
	 public List<Integer> getDistance2(int v) {
		 // Implement this method 
			List<Integer> distance2Nodes = new ArrayList<Integer>();
			
			// 1. Get immediate neighbors (distance 1)
			List<Integer> neighbors = adjListsMap.get(v);
			
			if (neighbors == null) {
				return distance2Nodes;
			}

			// 2. For each neighbor, find their neighbors (distance 2)
			for (int neighbor : neighbors) {
				List<Integer> secondHop = adjListsMap.get(neighbor);
				if (secondHop != null) {
					// Add all nodes reachable from the current neighbor
					distance2Nodes.addAll(secondHop);
				}
			}

			return distance2Nodes;
		}
	
	/**
	 * Generate string representation of adjacency list
	 * @return the String
	 */
	public String adjacencyString() {
		String s = "Adjacency list";
		s += " (size " + getNumVertices() + "+" + getNumEdges() + " integers):";

		for (int v : adjListsMap.keySet()) {
			s += "\n\t"+v+": ";
			for (int w : adjListsMap.get(v)) {
				s += w+", ";
			}
		}
		return s;
	}

}
