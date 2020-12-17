import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbIconModule, NbInputModule, NbSelectModule } from "@nebular/theme";

import { SubjectFilterComponent } from "./subject-filter.component";

@NgModule({
  imports: [
    CommonModule,
    NbSelectModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
  ],
  declarations: [SubjectFilterComponent],
})
export class SubjectFilterModule {}
