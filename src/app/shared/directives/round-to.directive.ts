import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appRoundValue]',
  standalone: true // Ustawienie dyrektywy jako standalone
})
export class RoundValueDirective {

  @Input() decimals: number | null = 2;

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    let value = parseFloat(this.el.nativeElement.value);
    if (!isNaN(value)) {
      if (this.decimals !== null) {
        this.el.nativeElement.value = value.toFixed(this.decimals);
      } else {
        this.el.nativeElement.value = Math.round(value).toString();
      }
    }
  }
}
