import { Component, OnInit } from '@angular/core';

import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent {
  constructor(
    protected ref: NbDialogRef<DeleteConfirmationDialogComponent>,
    private toastrService: NbToastrService,
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
          ? 'Элемент привязан к другим сущностям'
          : 'Произошла ошибка';

      this.toastrService.show('Ошибка', message, {
        status: 'danger',
      });
    }
  }
}
