import { createReducer, on } from '@ngrx/store';

import { registrarClick } from './tracking.actions';

export interface TrackingState {

  tags: {
    [key: string]: number;
  };

}

export const estadoInicial: TrackingState = {

  tags: {}

};

export const trackingReducer = createReducer(

  estadoInicial,

  on(registrarClick, (state, { tag }) => {

    const contador = state.tags[tag] || 0;

    return {

      ...state,

      tags: {

        ...state.tags,

        [tag]: contador + 1

      }

    };

  })

);