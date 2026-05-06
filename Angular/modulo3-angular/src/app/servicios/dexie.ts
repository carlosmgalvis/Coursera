import Dexie, {Table} from 'dexie';
import { Injectable } from '@angular/core';
import { Tarea } from '../modelos/tarea';

@Injectable ({providedIn: 'root'})

export class DexieService

extends Dexie {
  tareas!: Table<Tarea, number>;

  constructor() {
    super('BaseTareas');
    this.version(1).stores({
      tareas: 'id,nombre'});}}