import { Component, input } from '@angular/core';
import { FieldTypeDefinition } from '../../../models/field';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-button',
  imports: [MatIconModule, DragDropModule],
  template: `
    <button
      cdkDrag
      [cdkDragData]="field()"
      class="w-full p-3 border border-gray-200 hover:border-black hover:shadow-md transition-shadow rounded-lg flex items-center gap-3 cursor-pointer"
    >
      <div>
        <mat-icon
          class="rounded-md bg-gray-100 flex items-center justify-center p-1"
          >{{ field().icon }}</mat-icon
        >
      </div>
      <span>
        {{ field().label }}
      </span>
      <div *cdkDragPlaceholder></div>
    </button>
  `,
  styles: ``,
})
export class FieldButtonComponent {
  field = input.required<FieldTypeDefinition>();
}
