import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OptionItem } from '../../../models/field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-options',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  template: `
    <div>
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-gray-700">{{ title() }}</h3>
        <button mat-icon-button (click)="addOption()">
          <mat-icon>add_circle</mat-icon>
        </button>
      </div>
      <div class="flex flex-col gap-2 mb-4 mt-2">
        @for (option of options(); track i; let i = $index) {
        <div class="flex items-center">
          <mat-form-field appearance="fill" class="flex-1 compact">
            <input
              matInput
              [ngModel]="option.label"
              (ngModelChange)="updateOption(i, $event)"
            />
          </mat-form-field>
          <button mat-icon-button (click)="removeOption(i)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
        }
      </div>
    </div>
  `,
})
export class DynamicOptionsComponent {
  title = input('');
  options = input.required<OptionItem[]>();
  optionsChange = output<OptionItem[]>();

  addOption() {
    const currentOptions = this.options();
    const usedNumbers = currentOptions
      .map((opt) => parseInt(opt.value?.split('-')[1] || '0'))
      .filter((n) => !isNaN(n));

    const nextNumber = this.getNextAvailableNumber(usedNumbers);

    const newOption: OptionItem = {
      label: `Option ${nextNumber}`,
      value: `option-${nextNumber}`,
    };

    this.optionsChange.emit([...currentOptions, newOption]);
  }

  private getNextAvailableNumber(used: number[]): number {
    let n = 1;
    while (used.includes(n)) {
      n++;
    }
    return n;
  }

  removeOption(index: number) {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.splice(index, 1);
    this.optionsChange.emit(newOptions);
  }

  updateOption(index: number, newLabel: string) {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions[index] = {
      label: newLabel,
      value: this.slugify(newLabel),
    };
    this.optionsChange.emit(newOptions);
  }

  private slugify(label: string): string {
    return label
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');
  }
}
