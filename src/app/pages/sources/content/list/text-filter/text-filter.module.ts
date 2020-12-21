import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';

import { TextFilterComponent } from './text-filter.component';

@NgModule({
  imports: [CommonModule, NbInputModule, ReactiveFormsModule, FormsModule],
  declarations: [TextFilterComponent],
})
export class TextFilterModule {}
