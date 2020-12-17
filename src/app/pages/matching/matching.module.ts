import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbButtonModule, NbCardModule, NbInputModule } from "@nebular/theme";

import { MatchingComponent } from "./matching.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
  ],
  declarations: [MatchingComponent],
})
export class MatchingModule {}
