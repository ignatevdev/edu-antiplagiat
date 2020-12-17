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

import { ThemeModule } from '../../@theme/theme.module';
import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesComponent } from './sources.component';
import { SourcesCreateComponent } from './create/sources-create.component';
import { SourcesEditComponent } from './edit/sources-edit.component';
import { SourcesListComponent } from './list/sources-list.component';
import { SourcesFormModule } from './form/sources-form.module';
import { DeleteConfirmationDialogModule } from './list/delete-confirmation-dialog/delete-confirmation.module';
import { SourceLinkModule } from './list/source-link/source-link.module';
import { TextFilterModule } from './list/text-filter/text-filter.module';
import { PublisherFilterModule } from './list/publisher-filter/publisher-filter.module';
import { SubjectFilterModule } from './list/subject-filter/subject-filter.module';

const components = [
  SourcesComponent,
  SourcesListComponent,
  SourcesCreateComponent,
  SourcesEditComponent,
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
    SourcesRoutingModule,
    Ng2SmartTableModule,
    DeleteConfirmationDialogModule,
    SourcesFormModule,
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,
    SourceLinkModule,
    TextFilterModule,
    PublisherFilterModule,
    SubjectFilterModule,
  ],
  declarations: [...components],
})
export class SourcesModule {}
