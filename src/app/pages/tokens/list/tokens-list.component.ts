import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { NbDialogService } from '@nebular/theme';

import { TokensDataSource } from '../utils/tokens-data-source';
import { PermissionsColumnComponent } from './permissions-column/permissions-column.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'ngx-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.scss'],
})
export class TokensListComponent {
  constructor(
    http: HttpClient,
    private datePipe: DatePipe,
    private dialogService: NbDialogService,
  ) {
    this.source = new TokensDataSource(http);
  }

  settings: any = {
    actions: {
      columnTitle: 'Действия',
      add: false,
      edit: false,
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
      name: {
        title: 'Название',
        sort: false,
      },
      token: {
        title: 'Токен',
        sort: false,
      },
      permissions: {
        title: 'Права',
        type: 'custom',
        renderComponent: PermissionsColumnComponent,
        sort: false,
      },
      created_at: {
        title: 'Дата создания',
        valuePrepareFunction: date => {
          const raw = new Date(date);

          return this.datePipe.transform(raw, 'dd.MM.yyyy');
        },
        sort: false,
      },
    },
  };

  source: TokensDataSource;

  onEdit = e => {};

  onDelete = e => {
    const { id, name } = e.data;

    const onDelete = () => {
      this.source.remove({ id }).then(() => {
        this.source.getElements().then(data => {
          this.source.load(data);
        });
      });
    };

    this.dialogService.open(DeleteConfirmationDialogComponent, {
      context: {
        name,
        onDelete,
      },
    });
  };
}
