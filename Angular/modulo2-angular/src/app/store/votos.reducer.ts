import { createReducer, on } from '@ngrx/store';
import { agregarElemento, eliminarElemento, votarFavor, votarContra } from './votos.actions';

export interface EstadoVotos {
  elementos: any[];
}

export const estadoInicial: EstadoVotos = {
  elementos: []
};

export const votosReducer = createReducer(
  estadoInicial,

  on(agregarElemento, (state, { nombre }) => ({
    ...state,
    elementos: [
      ...state.elementos,
      {
        id: Date.now(),
        nombre,
        votosFavor: 0,
        votosContra: 0
      }
    ]
  })),

  on(eliminarElemento, (state, { id }) => ({
    ...state,
    elementos: state.elementos.filter(e => e.id !== id)
  })),

  on(votarFavor, (state, { id }) => ({
    ...state,
    elementos: state.elementos.map(e =>
      e.id === id ? { ...e, votosFavor: e.votosFavor + 1 } : e
    )
  })),

  on(votarContra, (state, { id }) => ({
    ...state,
    elementos: state.elementos.map(e =>
      e.id === id ? { ...e, votosContra: e.votosContra + 1 } : e
    )
  }))
);