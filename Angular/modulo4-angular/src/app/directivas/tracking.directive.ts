import {
  Directive,
  ElementRef,
  Input,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';

import { fromEvent } from 'rxjs';

import { registrarClick } from '../store/tracking.actions';

@Directive({
  selector: '[appTracking]',
  standalone: true
})
export class TrackingDirective implements OnInit {

  @Input() trackingTag = '';

  constructor(

    private elemento: ElementRef,

    private store: Store

  ) {}

  ngOnInit() {

    fromEvent(
      this.elemento.nativeElement,
      'click'

    ).subscribe(() => {

      this.store.dispatch(

        registrarClick({
          tag: this.trackingTag
        })

      );

    });

  }

}