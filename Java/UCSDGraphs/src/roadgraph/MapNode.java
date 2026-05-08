/**
 * A class to represent a node in the map
 */
package roadgraph;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import geography.GeographicPoint;

/**
 * @author UCSD MOOC development team
 * 
 * Class representing a vertex (or node) in our MapGraph
 *
 */
public class MapNode implements Comparable<MapNode> {
	/** The list of edges out of this node */
//	private HashSet<MapEdge> edges;
		
	/** the latitude and longitude of this node */
	private GeographicPoint location;
	private List<MapEdge> edges;	
	private double distance;       // Priority distance (f-score)
    private double actualDistance; // Actual path cost from start (g-score)
    
	/** 
	 * Create a new MapNode at a given Geographic location
	 * @param loc the location of this node
	 */
	public MapNode(GeographicPoint loc)
	{
		this.location = loc;
        this.edges = new ArrayList<>();
        this.distance = Double.POSITIVE_INFINITY;
        this.actualDistance = Double.POSITIVE_INFINITY;
	}
	
	// Getters and Setters
    public void setDistance(double d) { this.distance = d; }
    public double getDistance() { return this.distance; }
    
    public void setActualDistance(double d) { this.actualDistance = d; }
    public double getActualDistance() { return this.actualDistance; }

    public void addEdge(MapEdge edge) { edges.add(edge); }
    public List<MapEdge> getEdges() { return edges; }
    public GeographicPoint getLocation() { return location; }
	
		

	/**  
	 * Return the neighbors of this MapNode 
	 * @return a set containing all the neighbors of this node
	 */
	Set<MapNode> getNeighbors()
	{
		Set<MapNode> neighbors = new HashSet<MapNode>();
		for (MapEdge edge : edges) {
			neighbors.add(edge.getOtherNode(this));
		}
		return neighbors;
	}
	
	/** Returns whether two nodes are equal.
	 * Nodes are considered equal if their locations are the same, 
	 * even if their street list is different.
	 * @param o the node to compare to
	 * @return true if these nodes are at the same location, false otherwise
	 */
	@Override
	public boolean equals(Object o)
	{
		if (!(o instanceof MapNode) || (o == null)) {
			return false;
		}
		MapNode node = (MapNode)o;
		return node.location.equals(this.location);
	}
	
	/** Because we compare nodes using their location, we also 
	 * may use their location for HashCode.
	 * @return The HashCode for this node, which is the HashCode for the 
	 * underlying point
	 */
	@Override
	public int hashCode()
	{
		return location.hashCode();
	}
	
	/** ToString to print out a MapNode object
	 *  @return the string representation of a MapNode
	 */
	@Override
	public String toString()
	{
		String toReturn = "[NODE at location (" + location + ")";
		toReturn += " intersects streets: ";
		for (MapEdge e: edges) {
			toReturn += e.getRoadName() + ", ";
		}
		toReturn += "]";
		return toReturn;
	}

	// For debugging, output roadNames as a String.
	public String roadNamesAsString()
	{
		String toReturn = "(";
		for (MapEdge e: edges) {
			toReturn += e.getRoadName() + ", ";
		}
		toReturn += ")";
		return toReturn;
	}


    /**
     * Critical for PriorityQueue: 
     * Compares this node with another based on their distance fields.
     */

    public int compareTo(MapNode other) {
        return Double.compare(this.getDistance(), other.getDistance());
    }	
}
