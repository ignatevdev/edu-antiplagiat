import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';

import { TokensDataSource } from '../utils/tokens-data-source';
import { tokenPermissions } from '../utils/constants';
import { TokenInfoDialogComponent } from './token-info-dialog/token-info-dialog.component';

@Component({
  selector: 'ngx-tokens-create',
  templateUrl: './tokens-create.component.html',
  styleUrls: ['./tokens-create.component.scss'],
})
export class TokensCreateComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    permissions: new FormArray([]),
  });

  source: TokensDataSource;

  availablePermissions = tokenPermissions;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogService: NbDialogService,
  ) {
    this.addCheckboxes();

    this.source = new TokensDataSource(http);
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
        this.router.navigateByUrl('/pages/tokens');

        this.dialogService.open(TokenInfoDialogComponent, {
          context: {
            token: data.meta.token,
          },
        });
      });
    }
  }

  private addCheckboxes() {
    this.availablePermissions.forEach(() =>
      this.permissionsFormArray.push(new FormControl(false)),
    );
  }
}
