package spelling;

import java.util.List;
import java.util.Set;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Queue;

/** 
 * An trie data structure that implements the Dictionary and the AutoComplete ADT
 * @author You
 *
 */
public class AutoCompleteDictionaryTrie implements  Dictionary, AutoComplete {

    private TrieNode root;
    private int size;
    

    public AutoCompleteDictionaryTrie()
	{
        root = new TrieNode();
        size = 0;
	}
	
	
	/** Insert a word into the trie.
	 * For the basic part of the assignment (part 2), you should ignore the word's case.
	 * That is, you should convert the string to all lower case as you insert it. */
	public boolean addWord(String word)
	{
	    //TODO: Implement this method.
        String lowerWord = word.toLowerCase();
        TrieNode curr = root;

        for (char c : lowerWord.toCharArray()) {
            TrieNode next = curr.getChild(c);
            if (next == null) {
                next = curr.insert(c);
            }
            curr = next;
        }

        if (!curr.endsWord()) {
            curr.setEndsWord(true);
            size++;
            return true;
        }

        return false;
	}
	
	/** 
	 * Return the number of words in the dictionary.  This is NOT necessarily the same
	 * as the number of TrieNodes in the trie.
	 */
	public int size()
	{
	    //TODO: Implement this method
        return size;
	}
	
	
	/** Returns whether the string is a word in the trie */
	@Override
	public boolean isWord(String s) 
	{
	    // TODO: Implement this method
        String lowerS = s.toLowerCase();
        TrieNode curr = root;

        for (char c : lowerS.toCharArray()) {
            curr = curr.getChild(c);
            if (curr == null) return false;
        }

        return curr.endsWord();
	}

	/** 
	 *  * Returns up to the n "best" predictions, including the word itself,
     * in terms of length
     * If this string is not in the trie, it returns null.
     * @param text The text to use at the word stem
     * @param n The maximum number of predictions desired.
     * @return A list containing the up to n best predictions
     */@Override
     public List<String> predictCompletions(String prefix, int numCompletions) 
     {
    	 // TODO: Implement this method
    	 // This method should implement the following algorithm:
    	 // 1. Find the stem in the trie.  If the stem does not appear in the trie, return an
    	 //    empty list
    	 // 2. Once the stem is found, perform a breadth first search to generate completions
    	 //    using the following algorithm:
    	 //    Create a queue (LinkedList) and add the node that completes the stem to the back
    	 //       of the list.
    	 //    Create a list of completions to return (initially empty)
    	 //    While the queue is not empty and you don't have enough completions:
    	 //       remove the first Node from the queue
    	 //       If it is a word, add it to the completions list
    	 //       Add all of its child nodes to the back of the queue
    	 // Return the list of completions
         String lowerPrefix = prefix.toLowerCase();
         List<String> completions = new LinkedList<>();
         TrieNode curr = root;

         // 1. Encontrar el nodo donde termina el prefijo (stem)
         for (char c : lowerPrefix.toCharArray()) {
             curr = curr.getChild(c);
             if (curr == null) return completions; // Retorna lista vacía si no existe el prefijo
         }

         // 2. BFS para encontrar las palabras sugeridas
         Queue<TrieNode> queue = new LinkedList<>();
         queue.add(curr);

         while (!queue.isEmpty() && completions.size() < numCompletions) {
             TrieNode node = queue.poll();

             if (node.endsWord()) {
                 completions.add(node.getText());
             }

             for (Character c : node.getValidNextCharacters()) {
                 queue.add(node.getChild(c));
             }
         }

         return completions;
     }

 	// For debugging
 	public void printTree()
 	{
 		printNode(root);
 	}
 	
 	/** Do a pre-order traversal from this node down */
 	public void printNode(TrieNode curr)
 	{
 		if (curr == null) 
 			return;
 		
 		System.out.println(curr.getText());
 		
 		TrieNode next = null;
 		for (Character c : curr.getValidNextCharacters()) {
 			next = curr.getChild(c);
 			printNode(next);
 		}
 	}
 	

	
}