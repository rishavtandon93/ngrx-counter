import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberComma]',
})
export class NumberCommaDirective implements OnInit {
  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit(): void {
    // Format initial value on form initialization if the value exists
    const initialValue = this.control.control?.value;
    if (initialValue) {
      this.el.nativeElement.value = this.formatNumberWithCommas(initialValue);
    }
  }

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    const input = this.el.nativeElement;

    // Save current cursor position
    let cursorPosition = input.selectionStart;

    // Get the raw value (remove commas)
    let numericValue = input.value.replace(/,/g, '');

    // If the input is not a valid number, don't proceed
    if (isNaN(Number(numericValue))) {
      return;
    }

    // Save the previous length for cursor position adjustment
    const previousLength = input.value.length;

    // Format the value with commas
    input.value = this.formatNumberWithCommas(numericValue);

    // Update the form control value (without commas)
    this.control.control?.setValue(numericValue);

    // Adjust the cursor position based on the new formatted value
    cursorPosition = cursorPosition + (input.value.length - previousLength);
    input.setSelectionRange(cursorPosition, cursorPosition);
  }

  @HostListener('blur')
  onBlur(): void {
    const input = this.el.nativeElement;
    // Ensure the value is formatted with commas when the input loses focus
    input.value = this.formatNumberWithCommas(input.value.replace(/,/g, ''));
  }

  // Helper method to format numbers with commas
  private formatNumberWithCommas(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
