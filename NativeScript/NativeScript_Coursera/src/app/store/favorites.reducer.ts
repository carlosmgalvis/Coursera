import { createReducer, on } from '@ngrx/store';
import { toggleFavorite, addReadItem, removeReadItem } from './favorites.actions';
import { Product } from '../shared/services/product.service';

export interface FavoritesState {
  favorites: Product[];
  readItems: Product[];
}

export const initialState: FavoritesState = {
  favorites: [],
  readItems: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(toggleFavorite, (state, { product }) => {
    const exists = state.favorites.find(fav => fav.id === product.id);
    if (exists) {
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== product.id)
      };
    } else {
      return {
        ...state,
        favorites: [...state.favorites, product]
      };
    }
  }),
  on(addReadItem, (state, { product }) => {
    const exists = state.readItems.find(item => item.id === product.id);
    if (exists) {
      return state; // Already read, do nothing
    } else {
      return {
        ...state,
        readItems: [...state.readItems, product]
      };
    }
  }),
  on(removeReadItem, (state, { productId }) => {
    return {
      ...state,
      readItems: state.readItems.filter(item => item.id !== productId)
    };
  })
);