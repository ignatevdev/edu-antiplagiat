import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { tokenPermissionNames } from '../../utils/constants';

@Component({
  selector: 'ngx-users-permissions-column',
  template: ` {{ permissions }} `,
})
export class PermissionsColumnComponent implements OnInit, ViewCell {
  @Input() value; // data from table
  @Input() rowData;

  permissions: string[];

  ngOnInit() {
    this.permissions = this.value
      .map(item => tokenPermissionNames[item])
      .join('\n');
  }
}
