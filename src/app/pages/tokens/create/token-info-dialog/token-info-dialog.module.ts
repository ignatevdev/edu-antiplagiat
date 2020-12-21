import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { TokenInfoDialogComponent } from './token-info-dialog.component';

@NgModule({
  imports: [CommonModule, NbCardModule, NbButtonModule],
  declarations: [TokenInfoDialogComponent],
})
export class TokenInfoDialogModule {}
