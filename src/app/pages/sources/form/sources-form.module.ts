import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import {
  NbAutocompleteModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
} from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';

import { SourcesFormComponent } from './sources-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbAutocompleteModule,
    ThemeModule,
    TagInputModule,
  ],
  exports: [SourcesFormComponent],
  declarations: [SourcesFormComponent],
})
export class SourcesFormModule {}
