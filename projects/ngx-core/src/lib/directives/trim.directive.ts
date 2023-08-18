import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

let timer: any;

@Directive({
  selector: '[trim]',
})
export class TrimDirective {
  constructor(
    private ref: ElementRef<HTMLInputElement>,
    private readonly control: NgControl
  ) {}

  @HostListener('input')
  oInputDirective() {
    const _start = this.ref.nativeElement.selectionStart as number;

    const _value = this.ref.nativeElement.value;
    this.ref.nativeElement.value = _value.replace(/\s/g, '');
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (/\s/g.test(_value)) {
        this.ref.nativeElement.setSelectionRange(_start - 1, _start - 1);
      }
    }, 0);
  }
}
