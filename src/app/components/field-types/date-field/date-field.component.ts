import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../../../models/field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-field',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  template: `
    <mat-form-field appearance="fill" class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <input matInput [matDatepicker]="picker" [required]="field().required" />
      <mat-datepicker-toggle
        matIconSuffix
        [for]="picker"
      ></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
})
export class DateFieldComponent {
  field = input.required<FormField>();
}
