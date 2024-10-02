import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberComma]',
})
export class NumberCommaDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    const input = this.el.nativeElement;

    // Get the raw value of the input (remove commas)
    let numericValue = input.value.replace(/,/g, '');

    // Prevent any non-numeric input (except backspace and delete)
    if (isNaN(Number(numericValue))) {
      input.value = this.previousValue;
      return;
    }

    // Save the position of the cursor before formatting
    const cursorPosition = input.selectionStart;

    // Store the previous value for comparison
    this.previousValue = numericValue;

    // Format the numeric value with commas
    input.value = this.formatNumberWithCommas(numericValue);

    // Update the form control with the numeric value (without commas)
    this.control.control?.setValue(numericValue);

    // Adjust the cursor position based on comma formatting
    this.adjustCursorPosition(cursorPosition, numericValue.length, input);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any): void {
    // When the input loses focus, ensure the value is correctly formatted
    const input = this.el.nativeElement;
    input.value = this.formatNumberWithCommas(input.value.replace(/,/g, ''));
  }

  private formatNumberWithCommas(value: string): string {
    // Add commas for every 3 digits
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  private adjustCursorPosition(
    cursorPosition: number,
    unformattedLength: number,
    input: HTMLInputElement
  ): void {
    const formattedValueLength = input.value.length;
    const lengthDifference = formattedValueLength - unformattedLength;

    // Adjust the cursor position after formatting
    input.setSelectionRange(
      cursorPosition + lengthDifference,
      cursorPosition + lengthDifference
    );
  }
}
