/**
 * 
 */
package graph;

import java.io.*;
import java.util.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Queue;
import java.util.Stack;

import util.GraphLoader;

/**
 * @author Kacper.
 * 
 *         For the warm up assignment, you must implement your Graph in a class
 *         named CapGraph. Here is the stub file.
 *
 */
public class CapGraph implements Graph {

//	private ArrayList <Integer> HashNr;
//	private ArrayList< ArrayList<Integer>> nodesList;	
	private HashMap<Integer, HashSet<Integer>> nodesSet; // export G
	private HashMap<Integer, ArrayList<Integer>> nodes; // Graph
	private ArrayList<Integer> ToVertices;
	private HashMap<Integer, ArrayList<Integer>> transpos;
	private List<Graph> SCCL;
	// private HashMap<Integer,ArrayList< Integer>> transpos2;
	// int Fullsize=nodes.size();
	// private HashMap<Integer,Integer> edges;
	private int HSetSize = 0;

	public void setHsSize(int s) {
		HSetSize = s;
	}

	public int getSize() {
		return nodes.size();
	}

	public CapGraph() {
		// nodesList= new ArrayList< ArrayList<Integer>>(HSetSize);
		// HashNr=new ArrayList< Integer> ();
		nodes = new HashMap<Integer, ArrayList<Integer>>(HSetSize);
		ToVertices = new ArrayList<Integer>();
		transpos = new HashMap<Integer, ArrayList<Integer>>();
		SCCL = new ArrayList<Graph>();
//		transpos2=new HashMap<Integer,ArrayList< Integer>>(HSetSize);
		// nodesSet=new HashMap<Integer,HashSet< Integer>>();
		// edges = new HashMap<Integer,Integer>();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see graph.Graph#addVertex(int)
	 */
	@Override
	public void addVertex(int num) {
		ArrayList<Integer> empty = new ArrayList<Integer>(HSetSize);
		ArrayList<Integer> empty2 = new ArrayList<Integer>(HSetSize);
		// TODO Auto-generated method stub
		if (nodes.containsKey(num) == false) {
			nodes.put(num, empty);
			ToVertices.add(num);
			transpos.put(num, empty2);
			// transpos2.put(num,empty );
			// ArrayList<Integer> edges=new ArrayList <Integer>();
			// HashNr.add(num);
			// nodesList.add(edges);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see graph.Graph#addEdge(int, int)
	 */
	@Override
	public void addEdge(int from, int to) {
		// TODO Auto-generated method stub
		// int indexOfFrom= HashNr.indexOf(from);
		// ArrayList<Integer> n1 = nodesList.get(indexOfFrom);
		ArrayList<Integer> n1 = nodes.get(from);
		ArrayList<Integer> n2 = transpos.get(to);
		// ArrayList<Integer> n3=transpos2.get(to);
		// check nodes are valid
		// MapEdge edge = new MapEdge(roadName, roadType, n1, n2, length);
		if (!n1.contains(to)) {
			n1.add(to);
			nodes.put(from, n1);
			// n1.put(nodes);
		}
		if (!n2.contains(from)) {
			n2.add(from);
			transpos.put(to, n2);
			// n1.put(nodes);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see graph.Graph#getEgonet(int)
	 */
	// System.out.println();
	@Override
	public Graph getEgonet(int center) {
		Graph yes = new CapGraph();
		yes.setHsSize(nodes.size());
		// yes.addVertex(center);
		ArrayList<Integer> centerEgo = nodes.get(center);
		for (int node : centerEgo) {
			// yes.addVertex(node);
			ArrayList<Integer> FriendsOfNode = nodes.get(node);
			for (int friend : FriendsOfNode) {
				yes.addVertex(node);
				/*
				 * if(friend==center&&friend==node) { continue; }
				 */
				ArrayList<Integer> FriendsOfFriend = nodes.get(friend);
				if (FriendsOfFriend.contains(center)) {
					yes.addEdge(node, friend);
					// yes.addEdge(node, friend);
				}
			}
		}
		// TODO Auto-generated method stub
		return yes;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see graph.Graph#getSCCs()
	 */
	@Override
	public List<Graph> getSCCs() {
		Collections.reverse(ToVertices);
		// TODO Auto-generated method stub
		Stack<Integer> vertices = new Stack<Integer>();
		// Collections.copy(ToVertices, vertices);
		for (int s = 0; s < ToVertices.size(); s++) {
			int p = ToVertices.get(s);
			vertices.add(p);
		}
		Stack<Integer> finished = DFS(nodes, vertices);
		Stack<Integer> finished2 = DFST(transpos, finished);
		return SCCL;
	}

	public Stack<Integer> DFST(HashMap<Integer, ArrayList<Integer>> nodes1, Stack<Integer> vertices) {
		Stack<Integer> finished = new Stack<Integer>();
		HashSet<Integer> visited = new HashSet<Integer>();

		while (vertices.size() > 0) {
			int v = vertices.pop();
			Graph CSS1;
			if (!visited.contains(v)) {
				CSS1 = new CapGraph();
				DFSVISITT(nodes1, v, visited, finished, CSS1);
				SCCL.add(CSS1);
			}
		}
		return finished;
	}

	public void DFSVISITT(HashMap<Integer, ArrayList<Integer>> nodes1, int v, HashSet<Integer> visited,
			Stack<Integer> finished, Graph CSS1) {

		if (!visited.contains(v)) {
			CSS1.addVertex(v);
		}
		visited.add(v);

		ArrayList<Integer> neighbors = nodes1.get(v);
		for (int n : neighbors) {
			if (!visited.contains(n)) {
				DFSVISITT(nodes1, n, visited, finished, CSS1);
			}
		}
		// CSS1.addVertex(v);
		// SCCL.add(CSS1);
		finished.push(v);
		// return CSS1;
	}

	public Stack<Integer> DFS(HashMap<Integer, ArrayList<Integer>> nodes1, Stack<Integer> vertices) {
		Stack<Integer> finished = new Stack<Integer>();
		HashSet<Integer> visited = new HashSet<Integer>();
		while (vertices.size() > 0) {
			int v = vertices.pop();
			if (!visited.contains(v)) {
				DFSVISIT(nodes, v, visited, finished);
			}
		}
		return finished;
	}

	public void DFSVISIT(HashMap<Integer, ArrayList<Integer>> nodes1, int v, HashSet<Integer> visited,
			Stack<Integer> finished) {
		visited.add(v);
		ArrayList<Integer> neighbors = nodes1.get(v);
		for (int n : neighbors) {
			if (!visited.contains(n)) {
				DFSVISIT(nodes, n, visited, finished);
			}
		}
		finished.push(v);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see graph.Graph#exportGraph()
	 */
	@Override
	public HashMap<Integer, HashSet<Integer>> exportGraph() {
		int size = nodes.size();
		if (size < HSetSize) {
			size = HSetSize;
		}
		nodesSet = new HashMap<Integer, HashSet<Integer>>(size);
		// TODO Auto-generated method stub
		for (int s : nodes.keySet()) {
			HashSet<Integer> SetFromArray = new HashSet<Integer>(); // size
			ArrayList<Integer> HashTheMap = nodes.get(s);
			for (int n : HashTheMap) {
				SetFromArray.add(n);
			}
			nodesSet.put(s, SetFromArray);
		}
		return nodesSet;
	}

	public static void main(String[] args) {
		Graph theGraph = new CapGraph();
		Graph EgoNet = new CapGraph();
		System.out.print("DONE. \nLoading the map...");
		GraphLoader.loadGraph(theGraph, "data/scc/test_10.txt");
		System.out.println("DONE.");
		// HashMap<Integer, HashSet<Integer>>nodes=new HashMap<Integer,
		// HashSet<Integer>>();
		// nodes=theGraph.exportGraph();
		/*
		 * for (int s : nodes.keySet()) { System.out.print(s);
		 * System.out.println(nodes.get(s)); //HashSet<Integer> //System.out.println(s);
		 * }
		 */
		theGraph.getSCCs();
		HashMap<Integer, HashSet<Integer>> Me = theGraph.exportGraph();
		HashMap<Integer, HashSet<Integer>> Ego;
		// EgoNet=theGraph.getEgonet(0);
		// Ego=EgoNet.exportGraph();

		// System.out.println(Ego);

	}

}
