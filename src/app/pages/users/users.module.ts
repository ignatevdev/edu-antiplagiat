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

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersCreateComponent } from './create/users-create.component';
import { UsersEditComponent } from './edit/users-edit.component';
import { UsersListComponent } from './list/users-list.component';
import { UsersFormModule } from './form/users-form.module';

const components = [
  UsersComponent,
  UsersListComponent,
  UsersCreateComponent,
  UsersEditComponent,
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
    UsersRoutingModule,
    Ng2SmartTableModule,
    DeleteConfirmationDialogModule,
    UsersFormModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [...components],
})
export class UsersModule {}
