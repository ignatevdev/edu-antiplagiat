import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-source-link-component',
  template: ` <a [routerLink]="['/pages/sources/view', id]"> {{ value }} </a> `,
})
export class SourceLinkComponent implements OnInit, ViewCell {
  @Input() value; // data from table
  @Input() rowData;

  id: string;

  permissions: string[];

  ngOnInit() {
    this.id = this.rowData.id;
  }
}
