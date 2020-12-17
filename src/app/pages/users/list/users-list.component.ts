import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { NbDialogService } from '@nebular/theme';

import { UsersDataSource } from '../utils/users-data-source';

import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { PermissionsColumnComponent } from './permissions-column/permissions-column.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  constructor(
    http: HttpClient,
    private datePipe: DatePipe,
    private dialogService: NbDialogService,
    private router: Router,
  ) {
    this.source = new UsersDataSource(http);
  }

  settings: any = {
    actions: {
      columnTitle: 'Действия',
      add: false,
      delete: false,
      position: 'right',
    },

    edit: {
      editButtonContent: 'Редактировать',
    },
    delete: {
      deleteButtonContent: 'Удалить',
    },

    hideSubHeader: true,
    sort: false,
    mode: 'external',
    columns: {
      first_name: {
        title: 'Имя',
        sort: false,
      },
      last_name: {
        title: 'Фамилия',
        sort: false,
      },
      email: {
        title: 'Email',
        sort: false,
      },
      permissions: {
        title: 'Права',
        type: 'custom',
        renderComponent: PermissionsColumnComponent,
        sort: false,
      },
      created_at: {
        title: 'Дата добавления',
        valuePrepareFunction: date => {
          const raw = new Date(date);

          return this.datePipe.transform(raw, 'dd.MM.yyyy');
        },
        sort: false,
      },
    },
  };

  source: UsersDataSource;

  onEdit = e => {
    this.router.navigateByUrl(`/pages/users/edit/${e.data.id}`);
  };

  onDelete = e => {
    const { first_name, last_name, email } = e.data;

    const names = [first_name, last_name].filter(Boolean);

    const name = names.length ? names.join(' ') : email;

    const onDelete = () => {};

    this.dialogService.open(DeleteConfirmationDialogComponent, {
      context: {
        name,
        onDelete,
      },
    });
  };
}
