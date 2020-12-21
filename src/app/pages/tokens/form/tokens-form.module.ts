import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';

import { TokensFormComponent } from './tokens-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbCheckboxModule,
    ThemeModule,
  ],
  exports: [TokensFormComponent],
  declarations: [TokensFormComponent],
})
export class TokensFormModule {}
