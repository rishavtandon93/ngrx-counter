Copy code
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appNumberComma]'
})
export class NumberCommaDirective implements OnInit {

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    // If the input has an initial value, format it with commas on initialization
    if (this.el.value) {
      this.el.value = this.formatNumberWithCommas(this.el.value.replace(/[^0-9\.]/g, ''));
    }
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const start = this.el.selectionStart;
    const end = this.el.selectionEnd;

    const initialValue = this.el.value;

    // Remove all non-numeric characters except for periods (for decimals)
    const cleanValue = initialValue.replace(/[^0-9\.]/g, '');

    // Reformat the number with commas
    this.el.value = this.formatNumberWithCommas(cleanValue);

    // Adjust the cursor position based on the changes in the string length
    const newStart = start + (this.el.value.length - initialValue.length);

    event.target.setSelectionRange(newStart, newStart);

    // Prevent non-numeric characters from being set as input value
    if (initialValue !== this.el.value) {
      event.stopPropagation();
    }
  }

  private formatNumberWithCommas(value: string): string {
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
