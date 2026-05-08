/**
 * 
 */
package textgen;

import static org.junit.Assert.*;

import java.util.LinkedList;

import org.junit.Before;
import org.junit.Test;

/**
 * @author UC San Diego MOOC team
 *
 */
public class MyLinkedListTester {

	private static final int LONG_LIST_LENGTH =10; 

	MyLinkedList<String> shortList;
	MyLinkedList<Integer> emptyList;
	MyLinkedList<Integer> longerList;
	MyLinkedList<Integer> list1;
	
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		// Feel free to use these lists, or add your own
	    shortList = new MyLinkedList<String>();
		shortList.add("A");
		shortList.add("B");
		emptyList = new MyLinkedList<Integer>();
		longerList = new MyLinkedList<Integer>();
		for (int i = 0; i < LONG_LIST_LENGTH; i++)
		{
			longerList.add(i);
		}
		list1 = new MyLinkedList<Integer>();
		list1.add(65);
		list1.add(21);
		list1.add(42);
		
	}

	
	/** Test if the get method is working correctly.
	 */
	/*You should not need to add much to this method.
	 * We provide it as an example of a thorough test. */
	@Test
	public void testGet()
	{
		//test empty list, get should throw an exception
		try {
			emptyList.get(0);
			fail("Check out of bounds");
		}
		catch (IndexOutOfBoundsException e) {
			
		}
		
		// test short list, first contents, then out of bounds
		assertEquals("Check first", "A", shortList.get(0));
		assertEquals("Check second", "B", shortList.get(1));
		
		try {
			shortList.get(-1);
			fail("Check out of bounds");
		}
		catch (IndexOutOfBoundsException e) {
		
		}
		try {
			shortList.get(2);
			fail("Check out of bounds");
		}
		catch (IndexOutOfBoundsException e) {
		
		}
		// test longer list contents
		for(int i = 0; i<LONG_LIST_LENGTH; i++ ) {
			assertEquals("Check "+i+ " element", (Integer)i, longerList.get(i));
		}
		
		// test off the end of the longer array
		try {
			longerList.get(-1);
			fail("Check out of bounds");
		}
		catch (IndexOutOfBoundsException e) {
		
		}
		try {
			longerList.get(LONG_LIST_LENGTH);
			fail("Check out of bounds");
		}
		catch (IndexOutOfBoundsException e) {
		}
		
	}
	
	
	/** Test removing an element from the list.
	 * We've included the example from the concept challenge.
	 * You will want to add more tests.  */
	@Test
	public void testRemove()
	{
		int a = list1.remove(0);
		assertEquals("Remove: check a is correct ", 65, a);
		assertEquals("Remove: check element 0 is correct ", (Integer)21, list1.get(0));
		assertEquals("Remove: check size is correct ", 2, list1.size());
		
		// TODO: Add more tests here
	}
	
	/** Test adding an element into the end of the list, specifically
	 *  public boolean add(E element)
	 * */
	@Test
	public void testAddEnd()
	{
        // TODO: implement this test
		try {
			list1.add(null);
            fail("Check null pointer");
        } catch (NullPointerException e) {
        }
        
        boolean added = list1.add(10);
        assertTrue("Add should return true", added);
        assertEquals("Check size after add", 1, list1.size());
        assertEquals("Check value at end", Integer.valueOf(10), list1.get(0));
        
        list1.add(20);
        assertEquals("Check value after second add", Integer.valueOf(20), list1.get(1));		
	}

	
	/** Test the size of the list */
	@Test
	public void testSize()
	{
		// TODO: implement this test
		assertEquals("Size of empty list should be 0", 0, list1.size());
		list1.add(1);
		list1.add(2);
        assertEquals("Size after 2 adds should be 2", 2, list1.size());
        list1.remove(0);
        assertEquals("Size after remove should be 1", 1, list1.size());		
	}

	
	
	/** Test adding an element into the list at a specified index,
	 * specifically:
	 * public void add(int index, E element)
	 * */
	@Test
	public void testAddAtIndex()
	{
        // TODO: implement this test
		try {
			list1.add(-1, 5);
            fail("Check out of bounds");
        } catch (IndexOutOfBoundsException e) {
        }
        
		list1.add(0, 10); // Add to empty
		list1.add(1, 30); // Add to end
		list1.add(1, 20); // Add to middle (between 10 and 30)
        
        assertEquals("Check middle element", Integer.valueOf(20), list1.get(1));
        assertEquals("Check end element", Integer.valueOf(30), list1.get(2));		
	}
	
	/** Test setting an element in the list */
	@Test
	public void testSet()
	{
	    // TODO: implement this test
		list1.add(10);
		list1.add(20);
        
        Integer old = list1.set(1, 25);
        
        assertEquals("Check return value of set", Integer.valueOf(20), old);
        assertEquals("Check new value at index", Integer.valueOf(25), list1.get(1));
        
        try {
        	list1.set(5, 50);
            fail("Check out of bounds");
        } catch (IndexOutOfBoundsException e) {
        }	    
	}
	
	
	// TODO: Optionally add more test methods.
	
}
