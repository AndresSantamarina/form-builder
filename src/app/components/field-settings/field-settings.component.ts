import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FieldTypesService } from '../../services/field-types.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DynamicOptionsComponent } from './dynamic-options/dynamic-options.component';

@Component({
  selector: 'app-field-settings',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckbox,
    MatSelectModule,
    DynamicOptionsComponent,
  ],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm"
    >
      @if (formService.selectedField(); as selectedField) {
      <h3 class="text-xl font-medium mb-6 text-emerald-800">
        Field Properties
      </h3>
      <div class="flex flex-col gap-6">
        @for (setting of fieldSettings(); track setting.key) { @switch
        (setting.type) { @case ('text') {
        <mat-form-field appearance="fill" class="w-full">
          <mat-label> {{ setting.label }}</mat-label>
          <input
            matInput
            [ngModel]="fieldValues()[setting.key]"
            (ngModelChange)="updateField(selectedField.id, setting.key, $event)"
          />
        </mat-form-field>
        } @case ('checkbox') {
        <div class="flex items-center">
          <mat-checkbox
            [ngModel]="fieldValues()[setting.key]"
            (ngModelChange)="updateField(selectedField.id, setting.key, $event)"
          >
            {{ setting.label }}
          </mat-checkbox>
        </div>
        } @case ('select') {
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>{{ setting.label }}</mat-label>
          <mat-select
            [ngModel]="fieldValues()[setting.key]"
            (ngModelChange)="updateField(selectedField.id, setting.key, $event)"
          >
            @for (option of setting.options || []; track option.value) {
            <mat-option [value]="option.value">
              {{ option.label }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
        } @case ('dynamic-options') {
        <app-dynamic-options
          [title]="setting.label"
          [options]="fieldValues()[setting.key]"
          (optionsChange)="updateField(selectedField.id, setting.key, $event)"
        />
        } } }
      </div>
      }@else {
      <p class="text-gray-400 flex justify-center mt-20 text-sm">
        Select a field to customize it
      </p>
      }
    </div>
  `,
})
export class FieldSettingsComponent {
  formService = inject(FormService);
  fieldTypeService = inject(FieldTypesService);

  fieldSettings = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return [];

    const fieldDef = this.fieldTypeService.getFieldType(field.type);
    return fieldDef?.settingsConfig || [];
  });

  fieldValues = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return {};
    return field as any;
  });

  updateField(fieldId: string, key: string, value: any) {
    this.formService.updateField(fieldId, { [key]: value });
  }
}
