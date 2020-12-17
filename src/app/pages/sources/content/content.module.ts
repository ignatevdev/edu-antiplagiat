import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DeleteConfirmationDialogModule } from './list/delete-confirmation-dialog/delete-confirmation.module';
import { TextFilterModule } from './list/text-filter/text-filter.module';

import { ContentRoutingModule } from './content-routing.module';
import { ContentCreateComponent } from './create/content-create.component';
import { ContentEditComponent } from './edit/content-edit.component';
import { ContentListComponent } from './list/content-list.component';
import { ContentFormModule } from './form/content-form.module';
import { SourceLinkModule } from './list/source-link/source-link.module';
import { ThemeModule } from '../../../@theme/theme.module';

const components = [
  ContentListComponent,
  ContentCreateComponent,
  ContentEditComponent,
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
    ContentRoutingModule,
    Ng2SmartTableModule,
    DeleteConfirmationDialogModule,
    ContentFormModule,
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,
    TextFilterModule,
    SourceLinkModule,
  ],
  declarations: [...components],
})
export class ContentModule {}
