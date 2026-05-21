import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { favoritesReducer, FavoritesState } from './favorites.reducer';

export interface AppState {
  favorites: FavoritesState;
}

export const reducers: ActionReducerMap<AppState> = {
  favorites: favoritesReducer
};

// Selectors
export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectFavoritesList = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.favorites
);

export const selectReadItemsList = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.readItems
);