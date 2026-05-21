import { favoritesReducer, FavoritesState } from './favorites.reducer';
import { toggleFavorite, addReadItem, removeReadItem } from './favorites.actions';

describe('Favorites Reducer', () => {
  const initialState: FavoritesState = {
    favorites: [],
    readItems: []
  };

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    category: 'Test Category',
    price: 99.99
  };

  describe('unknown actions', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const state = favoritesReducer(initialState, action as any);
      expect(state).toBe(initialState);
    });
  });

  describe('toggleFavorite action', () => {
    it('should add a product to favorites when not present', () => {
      const action = toggleFavorite({ product: mockProduct });
      const state = favoritesReducer(initialState, action);
      
      expect(state.favorites.length).toBe(1);
      expect(state.favorites[0].id).toBe(1);
      expect(state.favorites[0].title).toBe('Test Product');
    });

    it('should remove a product from favorites when already present', () => {
      const stateWithFavorite: FavoritesState = {
        favorites: [mockProduct],
        readItems: []
      };
      
      const action = toggleFavorite({ product: mockProduct });
      const state = favoritesReducer(stateWithFavorite, action);
      
      expect(state.favorites.length).toBe(0);
    });

    it('should keep other favorites unchanged when toggling one', () => {
      const anotherProduct = { ...mockProduct, id: 2, title: 'Another Product' };
      const stateWithMultiple: FavoritesState = {
        favorites: [mockProduct, anotherProduct],
        readItems: []
      };
      
      const action = toggleFavorite({ product: mockProduct });
      const state = favoritesReducer(stateWithMultiple, action);
      
      expect(state.favorites.length).toBe(1);
      expect(state.favorites[0].title).toBe('Another Product');
    });
  });

  describe('addReadItem action', () => {
    it('should add a product to read items when not present', () => {
      const action = addReadItem({ product: mockProduct });
      const state = favoritesReducer(initialState, action);
      
      expect(state.readItems.length).toBe(1);
      expect(state.readItems[0].id).toBe(1);
    });

    it('should not add duplicate to read items', () => {
      const stateWithRead: FavoritesState = {
        favorites: [],
        readItems: [mockProduct]
      };
      
      const action = addReadItem({ product: mockProduct });
      const state = favoritesReducer(stateWithRead, action);
      
      expect(state.readItems.length).toBe(1);
    });

    it('should allow adding multiple different products to read items', () => {
      const anotherProduct = { ...mockProduct, id: 2 };
      const stateWithOneRead: FavoritesState = {
        favorites: [],
        readItems: [mockProduct]
      };
      
      const action = addReadItem({ product: anotherProduct });
      const state = favoritesReducer(stateWithOneRead, action);
      
      expect(state.readItems.length).toBe(2);
    });
  });

  describe('removeReadItem action', () => {
    it('should remove a product from read items', () => {
      const stateWithRead: FavoritesState = {
        favorites: [],
        readItems: [mockProduct]
      };
      
      const action = removeReadItem({ productId: 1 });
      const state = favoritesReducer(stateWithRead, action);
      
      expect(state.readItems.length).toBe(0);
    });

    it('should not affect other read items when removing one', () => {
      const anotherProduct = { ...mockProduct, id: 2 };
      const stateWithMultiple: FavoritesState = {
        favorites: [],
        readItems: [mockProduct, anotherProduct]
      };
      
      const action = removeReadItem({ productId: 1 });
      const state = favoritesReducer(stateWithMultiple, action);
      
      expect(state.readItems.length).toBe(1);
      expect(state.readItems[0].id).toBe(2);
    });

    it('should handle removing non-existent product gracefully', () => {
      const action = removeReadItem({ productId: 999 });
      const state = favoritesReducer(initialState, action);
      
      expect(state.readItems.length).toBe(0);
    });
  });
});