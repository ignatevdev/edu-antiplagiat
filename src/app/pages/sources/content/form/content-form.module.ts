import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
} from "@nebular/theme";
import { ThemeModule } from "app/@theme/theme.module";

import { ContentFormComponent } from "./content-form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbCheckboxModule,
    ThemeModule,
    NbSelectModule,
  ],
  exports: [ContentFormComponent],
  declarations: [ContentFormComponent],
})
export class ContentFormModule {}
