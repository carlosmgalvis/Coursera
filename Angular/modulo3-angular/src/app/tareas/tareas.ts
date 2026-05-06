import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TareasService } from '../servicios/tareas';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrls: ['./tareas.css']})

export class Tareas {nombre = ''; tareas$: Observable<any[]>;
  constructor (private tareasService:
      TareasService,

    private store: Store<any>) {this.tareas$ = this.store.select (state => state.app.tareas);}

  agregar() {
    if (!this.nombre.trim()) {
      return;}

    const tarea = {id: Date.now(), nombre: this.nombre};

    this.tareasService
      .agregarTarea(tarea);

    this.nombre = '';}}