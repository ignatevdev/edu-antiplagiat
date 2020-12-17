import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";

@Component({
  selector: "ap-source-link-component",
  template: `
    <a *ngIf="!!value" [href]="value" target="_blank">Ссылка</a>
    <span *ngIf="!value">—</span>
  `,
})
export class SourceLinkComponent implements ViewCell {
  @Input() value; // data from table
  @Input() rowData;
}
