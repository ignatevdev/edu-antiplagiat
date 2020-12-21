import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { userPermissionNames } from '../utils/constants';

@Component({
  selector: 'ngx-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  @Input() public form: FormGroup;
  @Input() public availablePermissions: string[];

  permissionNames = userPermissionNames;

  get permissionsFormArray() {
    return this.form.controls.permissions as FormArray;
  }

  ngOnInit() {}
}
