import { Component } from "@angular/core";

import { NbDialogRef, NbToastrService } from "@nebular/theme";

@Component({
  selector: "ap-delete-confirmation-dialog",
  templateUrl: "./delete-confirmation-dialog.component.html",
  styleUrls: ["./delete-confirmation-dialog.component.scss"],
})
export class DeleteConfirmationDialog {
  constructor(
    protected ref: NbDialogRef<DeleteConfirmationDialog>,
    private toastrService: NbToastrService
  ) {}

  onDelete: () => void;

  cancel() {
    this.ref.close();
  }

  async delete() {
    try {
      await this.onDelete();

      this.ref.close();
    } catch (e) {
      const message =
        e.status === 409
          ? "Элемент привязан к другим сущностям"
          : "Произошла ошибка";

      this.toastrService.show("Ошибка", message, {
        status: "danger",
      });
    }
  }
}
