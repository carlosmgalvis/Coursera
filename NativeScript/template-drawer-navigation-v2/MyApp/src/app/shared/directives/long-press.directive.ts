import { Directive, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core'
import { GestureTypes, TouchGestureEventData } from '@nativescript/core'

@Directive({
  selector: '[longPress]'
})
export class LongPressDirective implements OnDestroy {
  @Output() longPress = new EventEmitter<void>()
  
  private timeoutId: any = null

  constructor(private el: ElementRef) {
    this.el.nativeElement.on(GestureTypes.touch, this.onTouch, this)
  }

  private onTouch(args: TouchGestureEventData) {
    if (args.action === 'down') {
      this.timeoutId = setTimeout(() => {
        this.longPress.emit()
      }, 800) // 800ms para detectar long press
    } else if (args.action === 'up' || args.action === 'cancel') {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
    }
  }

  ngOnDestroy() {
    this.el.nativeElement.off(GestureTypes.touch, this.onTouch, this)
  }
}
