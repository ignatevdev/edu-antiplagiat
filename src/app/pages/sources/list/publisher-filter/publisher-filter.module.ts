import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbAutocompleteModule,
  NbIconModule,
  NbInputModule,
} from "@nebular/theme";

import { PublisherFilterComponent } from "./publisher-filter.component";

@NgModule({
  imports: [
    CommonModule,
    NbAutocompleteModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
  ],
  declarations: [PublisherFilterComponent],
})
export class PublisherFilterModule {}
