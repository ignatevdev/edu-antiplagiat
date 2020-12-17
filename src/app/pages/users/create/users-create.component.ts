import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';

import { UsersDataSource } from '../utils/users-data-source';
import { userPermissions } from '../utils/constants';

@Component({
  selector: 'ngx-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
})
export class UsersCreateComponent {
  form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    permissions: new FormArray([]),
  });

  source: UsersDataSource;

  availablePermissions = userPermissions;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogService: NbDialogService,
  ) {
    this.addCheckboxes();

    this.source = new UsersDataSource(http);
  }

  get permissionsFormArray() {
    return this.form.controls.permissions as FormArray;
  }

  onCreate() {
    if (this.form.valid) {
      const values = {
        ...this.form.value,
        permissions: this.form.value['permissions'].reduce(
          (reduction, enabled, index) => {
            if (enabled) {
              return [...reduction, this.availablePermissions[index]];
            }

            return reduction;
          },
          [],
        ),
      };

      this.source.add(values).then((data: any) => {
        this.router.navigateByUrl('/pages/users');
      });
    }
  }

  private addCheckboxes() {
    this.availablePermissions.forEach(() =>
      this.permissionsFormArray.push(new FormControl(false)),
    );
  }
}
