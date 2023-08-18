import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[LowerCase]',
  standalone: true,
})
export class LowerCase {
  constructor(private _elementRef: ElementRef) {
    console.log(this._elementRef.nativeElement);

    const _element = this._elementRef.nativeElement as HTMLElement;

    const _styles = {
      textTransform: 'lowercase',
    };

    Object.assign(_element.style, _styles);
  }
}
