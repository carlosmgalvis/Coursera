import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import { API_URL } from '../tokens/api-token';
import {AGREGAR_TAREA} from '../estado/acciones';
import { DexieService } from './dexie';

@Injectable ({providedIn: 'root'})

export class TareasService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private dexie: DexieService,

    @Inject(API_URL)
    private api: string
  ) {}

  agregarTarea(
    tarea: any
  ) {

    this.http.post(
      `${this.api}/tareas`,
      tarea

    ).subscribe(
      async (respuesta: any) => {
        if (respuesta.ok) {
          this.store.dispatch({
            type: AGREGAR_TAREA,
            payload: respuesta.tarea});

          await this.dexie
            .tareas
            .add(respuesta.tarea);}});}}