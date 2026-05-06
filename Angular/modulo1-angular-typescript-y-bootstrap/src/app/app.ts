import { Component } from '@angular/core';
import { ListaTareas } from './lista-tareas/lista-tareas';

@Component({
  selector: 'app-root',
  imports: [ListaTareas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}