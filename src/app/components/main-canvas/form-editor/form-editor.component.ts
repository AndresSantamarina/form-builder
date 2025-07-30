import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FieldTypeDefinition, FormField } from '../../../models/field';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule],
  template: `
    <div class="p-4">
      @for (row of formService.rows(); track row.id) {
      <div
        cdkDropList
        (cdkDropListDropped)="onDropInRow($event, row.id)"
        [cdkDropListOrientation]="'mixed'"
        class="p-5 pt-2 bg-white rounded-lg border-2 border-dashed border-gray-200"
      >
        <div>Row</div>
        <div class="flex gap-4 flex-wrap">
          @for (field of row.fields; track field.id) {
         
          }
        </div>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class FormEditorComponent {
  formService = inject(FormService);

  onDropInRow(event: CdkDragDrop<string>, rowId: string) {
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as FieldTypeDefinition;
      const newField: FormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        ...fieldType.defaultConfig,
      };
      this.formService.addField(newField, rowId, event.currentIndex);
      return;
    }
  }
}
