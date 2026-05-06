import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css'
})
export class Mapa {

  latitud = 3.4516;

  longitud = -76.5320;

  alerta() {

    alert('Marker presionado');

  }

}