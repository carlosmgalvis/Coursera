import {EstadoApp, estadoInicial} from './estado';
import {AGREGAR_TAREA} from './acciones';

export function reducer(
  state = estadoInicial,
  action: any

): EstadoApp {
  switch (action.type) {
    case AGREGAR_TAREA:
      return {
        ...state,
        tareas: [
          ...state.tareas,
          action.payload]};

    default:
      return state;}}