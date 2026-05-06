import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { TrackingDirective } from '../../directivas/tracking.directive';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, TrackingDirective],
  templateUrl: './panel.html',
  styleUrl: './panel.css',

  animations: [

    trigger('animacionCaja', [

      state('pequeno', style({
        transform: 'scale(1)'
      })),

      state('grande', style({
        transform: 'scale(1.2)'
      })),

      transition(
        'pequeno <=> grande',
        animate('300ms')
      )

    ])

  ]

})
export class Panel {

  estado = 'pequeno';

  tracking$;

  constructor(
    private store: Store<any>
  ) {

    this.tracking$ = this.store.select('tracking');
  }

  cambiarEstado() {

    this.estado =
      this.estado === 'pequeno'
      ? 'grande'
      : 'pequeno';
  }

}