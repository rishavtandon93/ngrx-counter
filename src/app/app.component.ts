import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberComma]',
})
export class NumberCommaDirective {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.el.value;

    // Remove all non-numeric characters (except for period for decimals)
    const cleanValue = initalValue.replace(/[^0-9\.]/g, '');

    // Reformat the number with commas
    this.el.value = this.formatNumberWithCommas(cleanValue);

    // Set cursor back to the end of input after formatting
    event.target.setSelectionRange(this.el.value.length, this.el.value.length);

    // Prevent non-numeric characters from being set as input value
    if (initalValue !== this.el.value) {
      event.stopPropagation();
    }
  }

  private formatNumberWithCommas(value: string): string {
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
