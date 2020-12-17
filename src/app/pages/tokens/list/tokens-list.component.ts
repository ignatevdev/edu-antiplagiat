import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { NbDialogService } from "@nebular/theme";

import { TokensDataSource } from "../utils/tokens-data-source";
import { PermissionsColumn } from "./permissions-column/permissions-column.component";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
  selector: "ap-tokens-list",
  templateUrl: "./tokens-list.component.html",
  styleUrls: ["./tokens-list.component.scss"],
})
export class TokensListComponent {
  constructor(
    http: HttpClient,
    private datePipe: DatePipe,
    private dialogService: NbDialogService
  ) {
    this.source = new TokensDataSource(http);
  }

  settings: any = {
    actions: {
      columnTitle: "Действия",
      add: false,
      edit: false,
      position: "right",
    },

    edit: {
      editButtonContent: "Редактировать",
    },
    delete: {
      deleteButtonContent: "Удалить",
    },

    hideSubHeader: true,
    sort: false,
    mode: "external",
    columns: {
      name: {
        title: "Название",
        sort: false,
      },
      token: {
        title: "Токен",
        sort: false,
      },
      permissions: {
        title: "Права",
        type: "custom",
        renderComponent: PermissionsColumn,
        sort: false,
      },
      created_at: {
        title: "Дата создания",
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = this.datePipe.transform(raw, "dd.MM.yyyy");
          return formatted;
        },
        sort: false,
      },
    },
  };

  source: TokensDataSource;

  onEdit = (e) => {
    console.log(e);
  };

  onDelete = (e) => {
    const { id, name } = e.data;

    const onDelete = () => {
      this.source.remove({ id }).then(() => {
        this.source.getElements().then((data) => {
          this.source.load(data);
        });
      });
    };

    this.dialogService.open(DeleteConfirmationDialog, {
      context: {
        name,
        onDelete,
      },
    });
  };
}
