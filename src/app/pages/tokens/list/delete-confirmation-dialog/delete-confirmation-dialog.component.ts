import { Component } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-tokens-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent {
  constructor(protected ref: NbDialogRef<DeleteConfirmationDialogComponent>) {}

  name: string;

  onDelete: () => void;

  cancel() {
    this.ref.close();
  }

  delete() {
    this.onDelete();

    this.ref.close();
  }
}
