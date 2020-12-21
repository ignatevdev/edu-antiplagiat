import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersDataSource } from '../utils/users-data-source';
import { userPermissions } from '../utils/constants';

@Component({
  selector: 'ngx-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.addCheckboxes();

    this.source = new UsersDataSource(this.http);
  }

  get permissionsFormArray() {
    return this.form.controls.permissions as FormArray;
  }

  form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
    permissions: new FormArray([]),
  });

  user: any;

  source: UsersDataSource;

  availablePermissions = userPermissions;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.source.find({ id }).then(user => {
      this.user = user;

      const permissions = this.availablePermissions.map(permissionId =>
        user.permissions.includes(permissionId),
      );

      this.form.setValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: '',
        permissions,
      });
    });
  }

  onEdit() {
    if (this.form.valid) {
      const values = {
        id: this.user.id,
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
        password: this.form.value['password'].length
          ? this.form.value['password']
          : undefined,
      };

      this.source.update(values).then((data: any) => {
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
