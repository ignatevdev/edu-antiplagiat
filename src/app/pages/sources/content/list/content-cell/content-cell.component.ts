import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";

@Component({
  selector: "ap-content-cell-component",
  template: ` {{ trimmed }}`,
})
export class ContentCellComponent implements OnInit, ViewCell {
  @Input() value; // data from table
  @Input() rowData;

  trimmed: string;

  ngOnInit() {
    const length = 70;

    this.trimmed =
      this.value.length > length
        ? this.value.substring(0, length - 3) + "..."
        : this.value;
  }
}
