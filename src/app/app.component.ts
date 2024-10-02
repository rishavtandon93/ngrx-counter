import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberComma]',
})
export class NumberCommaDirective {
  private lastCursorPosition: number = 0;

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    const input = this.el.nativeElement;

    // Get the position of the cursor before formatting
    const cursorPosition = input.selectionStart;
    const originalValue = input.value;

    // Remove commas
    let numericValue = originalValue.replace(/,/g, '');

    // Set the new raw numeric value to the form control
    this.control.control?.setValue(numericValue);

    if (!isNaN(Number(numericValue)) && numericValue !== '') {
      // Format the number with commas
      input.value = this.formatNumberWithCommas(numericValue);
    }

    // Adjust the cursor position after reformatting
    this.adjustCursorPosition(cursorPosition, originalValue, input);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any): void {
    // Ensure the input is formatted properly when the input field loses focus
    const input = this.el.nativeElement;
    input.value = this.formatNumberWithCommas(input.value.replace(/,/g, ''));
  }

  private formatNumberWithCommas(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Function to adjust the cursor position after formatting
  private adjustCursorPosition(
    cursorPosition: number,
    originalValue: string,
    input: HTMLInputElement
  ): void {
    const newFormattedValue = input.value;
    const lengthDiff = newFormattedValue.length - originalValue.length;

    // Set the new cursor position, adjusting for the difference caused by adding commas
    input.setSelectionRange(
      cursorPosition + lengthDiff,
      cursorPosition + lengthDiff
    );
  }
}
