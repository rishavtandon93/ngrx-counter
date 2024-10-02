<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" formControlName="name" />
  </div>

  <div>
    <label for="amount">Amount:</label>
    <input
      type="text"
      id="amount"
      formControlName="amount"
      appNumberComma
    />
  </div>

  <button type="submit">Submit</button>
</form>


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
})
export class MyFormComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const formValues = this.myForm.value;
      console.log('Form submitted:', formValues);
      // You can now use formValues.amount as a pure number (without commas)
    }
  }
}


import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyFormComponent } from './my-form/my-form.component';
import { NumberCommaDirective } from './directives/number-comma.directive';

@NgModule({
  declarations: [
    MyFormComponent,
    NumberCommaDirective // Add the directive here
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [MyFormComponent]
})
export class AppModule { }
