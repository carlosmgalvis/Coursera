import { Tarea } from '../modelos/tarea';

export interface EstadoApp {tareas: Tarea[];}
export const estadoInicial: EstadoApp = {tareas: []};