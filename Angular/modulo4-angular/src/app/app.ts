import { Component } from '@angular/core';

import { Panel } from './componentes/panel/panel';
import { Mapa } from './componentes/mapa/mapa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Panel, Mapa],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}