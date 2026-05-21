import { createAction, props } from '@ngrx/store';
import { Product } from '../shared/services/product.service';

export const toggleFavorite = createAction(
  '[Favorites] Toggle Favorite',
  props<{ product: Product }>()
);

export const addReadItem = createAction(
  '[Favorites] Add Read Item',
  props<{ product: Product }>()
);

export const removeReadItem = createAction(
  '[Favorites] Remove Read Item',
  props<{ productId: number }>()
);