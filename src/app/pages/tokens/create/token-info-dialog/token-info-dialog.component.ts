import { Component } from "@angular/core";

import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ap-token-info-dialog",
  templateUrl: "./token-info-dialog.component.html",
  styleUrls: ["./token-info-dialog.component.scss"],
})
export class TokenInfoDialogComponent {
  constructor(protected ref: NbDialogRef<TokenInfoDialogComponent>) {}

  token: string;

  close() {
    this.ref.close();
  }
}
