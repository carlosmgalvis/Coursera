import { createAction, props } from '@ngrx/store';

export const registrarClick = createAction(

  '[Tracking] Registrar Click',

  props<{ tag: string }>()

);