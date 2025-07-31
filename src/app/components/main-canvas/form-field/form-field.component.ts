import { Component, computed, inject, input } from '@angular/core';
import { FormField } from '../../../models/field';
import { FieldTypesService } from '../../../services/field-types.service';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-form-field',
  imports: [NgComponentOutlet, TitleCasePipe, MatButtonModule, MatIconModule],
  template: `
    <div
      class="bg-white p-4 pt-1 rounded-lg shadow-sm border border-gray-200 hover:border-black cursos-pointer"
    >
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm">{{ field().type | titlecase }}</span>
        <button mat-icon-button (click)="deleteField($event)">
          <mat-icon class="-mr-2">delete</mat-icon>
        </button>
      </div>
      <ng-container
        [ngComponentOutlet]="previewComponent()"
        [ngComponentOutletInputs]="{ field: field() }"
      ></ng-container>
    </div>
  `,
  styles: ``,
})
export class FormFieldComponent {
  field = input.required<FormField>();
  fomrService = inject(FormService);
  fieldTypesService = inject(FieldTypesService);

  previewComponent = computed(() => {
    const type = this.fieldTypesService.getFieldType(this.field().type);
    return type?.component ?? null;
  });

  deleteField(e: Event) {
    e.stopPropagation();
    this.fomrService.deleteField(this.field().id);
  }
}
