import { Component } from '@angular/core';

@Component({
  selector: 'app-main-canvas',
  imports: [],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm"
    >
      <div class="pb-4 border-b border-gray-200">
        <h3 class="text-xl font-medium">Forms Canvas</h3>
      </div>
    </div>
  `,
  styles: ``,
})
export class MainCanvasComponent {}
