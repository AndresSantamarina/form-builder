import { Component, input } from '@angular/core';
import { FieldTypeDefinition } from '../../../models/field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-field-button',
  imports: [MatIconModule],
  template: `
    <button
      class="w-full p-3 border border-gray-200 hover:border-black hover:shadow-md transition-shadow rounded-lg flex items-center gap-3 cursor-pointer"
    >
      <div>
        <mat-icon
          class="rounded-md bg-gray-100 flex items-center justify-center p-1"
          >{{ field().icon }}</mat-icon
        >
      </div>
      <span>
        {{field().label}}
      </span>
    </button>
  `,
  styles: ``,
})
export class FieldButtonComponent {
  field = input.required<FieldTypeDefinition>();
}
