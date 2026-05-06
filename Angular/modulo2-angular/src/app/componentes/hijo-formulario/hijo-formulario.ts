import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { nombreProhibidoValidator } from '../../validadores/nombre.validator';

@Component({
  selector: 'app-hijo-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hijo-formulario.html',
  styleUrl: './hijo-formulario.css'
})
export class HijoFormulario {

  @Output() agregar = new EventEmitter<any>();

  formulario: any;

  constructor(private fb: FormBuilder) {

    this.formulario = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          nombreProhibidoValidator('admin')
        ]
      ],

      descripcion: ['', Validators.required]
    });
  }

  enviar() {

    if (this.formulario.valid) {

      this.agregar.emit(this.formulario.value);

      this.formulario.reset();
    }
  }
}