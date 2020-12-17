import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NbButtonModule, NbCardModule } from "@nebular/theme";

import { DeleteConfirmationDialog } from "./delete-confirmation-dialog.component";

@NgModule({
  imports: [CommonModule, NbCardModule, NbButtonModule],
  declarations: [DeleteConfirmationDialog],
})
export class DeleteConfirmationDialogModule {}
