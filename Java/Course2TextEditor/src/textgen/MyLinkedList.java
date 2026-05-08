package textgen;

import java.util.AbstractList;


/** A class that implements a doubly linked list
 * 
 * @author UC San Diego Intermediate Programming MOOC team
 *
 * @param <E> The type of the elements stored in the list
 */
public class MyLinkedList<E> extends AbstractList<E> {
	LLNode<E> head;
	LLNode<E> tail;
	int size;

	/** Create a new empty LinkedList */
	public MyLinkedList() {
		// TODO: Implement this method
		// Initialize sentinel nodes
				size = 0;
				head = new LLNode<E>(null);
				tail = new LLNode<E>(null);
				head.next = tail;
				tail.prev = head;		
	}

	/**
	 * Appends an element to the end of the list
	 * @param element The element to add
	 */
	public boolean add(E element ) 
	{
		// TODO: Implement this method
		if (element == null) {
			throw new NullPointerException("MyLinkedList does not allow null elements.");
		}
		// Add at the very end (just before the sentinel tail)
		add(size, element);
		return true;
	}

	/** Get the element at position index 
	 * @throws IndexOutOfBoundsException if the index is out of bounds. */
	public E get(int index) 
	{
		// TODO: Implement this method.
		if (index < 0 || index >= size) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
		}
		
		LLNode<E> curr = head.next;
		for (int i = 0; i < index; i++) {
			curr = curr.next;
		}
		return curr.data;
	}

	/**
	 * Add an element to the list at the specified index
	 * @param The index where the element should be added
	 * @param element The element to add
	 */
	public void add(int index, E element ) 
	{
		// TODO: Implement this method
		if (element == null) {
			throw new NullPointerException("MyLinkedList does not allow null elements.");
		}
		// Index can be equal to size when appending to the end
		if (index < 0 || index > size) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
		}

		LLNode<E> newNode = new LLNode<E>(element);
		LLNode<E> curr = head;
		
		// Move to the node currently at 'index'
		// Because we start at head (sentinel), moving 'index' times puts us at the node BEFORE the target
		for (int i = 0; i <= index; i++) {
			curr = curr.next;
		}

		// Insert newNode before curr
		newNode.prev = curr.prev;
		newNode.next = curr;
		newNode.prev.next = newNode;
		curr.prev = newNode;
		
		size++;		
	}


	/** Return the size of the list */
	public int size() 
	{
		// TODO: Implement this method
		return size;
	}

	/** Remove a node at the specified index and return its data element.
	 * @param index The index of the element to remove
	 * @return The data element removed
	 * @throws IndexOutOfBoundsException If index is outside the bounds of the list
	 * 
	 */
	public E remove(int index) 
	{
		// TODO: Implement this method
		if (index < 0 || index >= size) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
		}

		LLNode<E> curr = head.next;
		for (int i = 0; i < index; i++) {
			curr = curr.next;
		}

		// Re-link neighbors to bypass curr
		curr.prev.next = curr.next;
		curr.next.prev = curr.prev;
		
		size--;
		return curr.data;
	}

	/**
	 * Set an index position in the list to a new element
	 * @param index The index of the element to change
	 * @param element The new element
	 * @return The element that was replaced
	 * @throws IndexOutOfBoundsException if the index is out of bounds.
	 */
	public E set(int index, E element) 
	{
		// TODO: Implement this method
		if (element == null) {
			throw new NullPointerException("MyLinkedList does not allow null elements.");
		}
		if (index < 0 || index >= size) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
		}

		LLNode<E> curr = head.next;
		for (int i = 0; i < index; i++) {
			curr = curr.next;
		}

		E oldData = curr.data;
		curr.data = element;
		return oldData;
	}   
}

class LLNode<E> 
{
	LLNode<E> prev;
	LLNode<E> next;
	E data;

	// TODO: Add any other methods you think are useful here
	// E.g. you might want to add another constructor

	public LLNode(E e) 
	{
		this.data = e;
		this.prev = null;
		this.next = null;
	}
	// Overloaded constructor for easier insertion logic
		public LLNode(E e, LLNode<E> prevNode) {
			this(e);
			this.next = prevNode.next;
			this.prev = prevNode;
			prevNode.next = this;
			if (this.next != null) {
				this.next.prev = this;
			}
		}
}
