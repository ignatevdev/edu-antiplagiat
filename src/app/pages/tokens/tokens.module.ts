import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DeleteConfirmationDialogModule } from './list/delete-confirmation-dialog/delete-confirmation.module';
import { TokenInfoDialogModule } from './create/token-info-dialog/token-info-dialog.module';

import { ThemeModule } from '../../@theme/theme.module';
import { TokensRoutingModule } from './tokens-routing.module';
import { TokensComponent } from './tokens.component';
import { TokensCreateComponent } from './create/tokens-create.component';
import { TokensListComponent } from './list/tokens-list.component';
import { TokensFormModule } from './form/tokens-form.module';

const components = [
  TokensComponent,
  TokensListComponent,
  TokensCreateComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    ThemeModule,
    TokensRoutingModule,
    Ng2SmartTableModule,
    DeleteConfirmationDialogModule,
    TokensFormModule,
    ReactiveFormsModule,
    FormsModule,
    TokenInfoDialogModule,
  ],
  declarations: [...components],
})
export class TokensModule {}
