import { createAction, props } from '@ngrx/store';

export const agregarElemento = createAction(
  '[Votos] Agregar',
  props<{ nombre: string }>()
);

export const eliminarElemento = createAction(
  '[Votos] Eliminar',
  props<{ id: number }>()
);

export const votarFavor = createAction(
  '[Votos] Votar Favor',
  props<{ id: number }>()
);

export const votarContra = createAction(
  '[Votos] Votar Contra',
  props<{ id: number }>()
);