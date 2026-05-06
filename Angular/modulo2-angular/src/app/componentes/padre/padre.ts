import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HijoFormulario } from '../hijo-formulario/hijo-formulario';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [CommonModule, HijoFormulario],
  templateUrl: './padre.html',
  styleUrl: './padre.css'
})
export class Padre {

  elementos: any[] = [];

  recibirEvento(datos: any) {
    

    console.log(datos);

    this.elementos.push(datos);
  }
  votarFavor(elemento: any) {

  if (!elemento.votosFavor) {
    elemento.votosFavor = 0;
  }

  elemento.votosFavor++;
}

votarContra(elemento: any) {

  if (!elemento.votosContra) {
    elemento.votosContra = 0;
  }

  elemento.votosContra++;
}}