import { Component } from "@angular/core";

import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ap-tokens-delete-confirmation-dialog",
  templateUrl: "./delete-confirmation-dialog.component.html",
  styleUrls: ["./delete-confirmation-dialog.component.scss"],
})
export class DeleteConfirmationDialog {
  constructor(protected ref: NbDialogRef<DeleteConfirmationDialog>) {}

  name: string;

  onDelete: () => void;

  cancel() {
    console.log("cancel");

    this.ref.close();
  }

  delete() {
    this.onDelete();

    this.ref.close();
  }
}
