import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarea } from '../modelo/tarea';

@Component({
  selector: 'app-lista-tareas',
  imports: [CommonModule],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css'
})
export class ListaTareas {

  @HostBinding('class')
  clases = 'container mt-4';

  titulo = 'Mis tareas';

  tareas: Tarea[] = [
    { nombre: 'Estudiar Angular' },
    { nombre: 'Hacer ejercicio' }
  ];

  agregarTarea(nombre: string) {
    if (nombre.trim() !== '') {
      this.tareas.push({ nombre });
    }
  }
}