import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";

import { DeleteConfirmationDialogModule } from "./list/delete-confirmation-dialog/delete-confirmation.module";

import { ThemeModule } from "../../@theme/theme.module";
import { CatalogsRoutingModule } from "./catalogs-routing.module";
import { CatalogsComponent } from "./catalogs.component";
import { CatalogsFormModule } from "./form/catalogs-form.module";
import { CatalogsListComponent } from "./list/catalogs-list.component";
import { CatalogsCreateComponent } from "./create/catalogs-create.component";
import { CatalogsEditComponent } from "./edit/catalogs-edit.component";

const components = [
  CatalogsComponent,
  CatalogsListComponent,
  CatalogsCreateComponent,
  CatalogsEditComponent,
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
    CatalogsRoutingModule,
    Ng2SmartTableModule,
    CatalogsFormModule,
    DeleteConfirmationDialogModule,
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,
  ],
  declarations: [...components],
})
export class CatalogsModule {}
