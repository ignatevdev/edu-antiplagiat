import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { NbDialogService } from "@nebular/theme";

import { CatalogsDataSource } from "../utils/catalogs-data-source";

import { DeleteConfirmationDialog } from "./delete-confirmation-dialog/delete-confirmation-dialog.component";

import { catalogNames } from "../utils/constants";

@Component({
  selector: "ap-catalogs-list",
  templateUrl: "./catalogs-list.component.html",
  styleUrls: ["./catalogs-list.component.scss"],
})
export class CatalogsListComponent {
  constructor(
    http: HttpClient,
    private dialogService: NbDialogService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRotue: ActivatedRoute
  ) {
    const catalog = this.activatedRotue.snapshot.paramMap.get("catalog");

    this.catalog = catalog;

    this.source = new CatalogsDataSource(http, catalog);

    this.activatedRotue.params.subscribe((params) => {
      this.catalog = params.catalog;

      this.source.setCatalog(params.catalog);

      this.source.getElements().then((data) => {
        this.source.load(data);
      });
    });
  }

  catalogNames = catalogNames;
  catalog: string;

  settings: any = {
    actions: {
      columnTitle: "Действия",
      add: false,
      position: "right",
    },
    edit: {
      editButtonContent: "Редактировать",
    },
    delete: {
      deleteButtonContent: "Удалить",
    },
    sort: false,
    hideSubHeader: true,
    mode: "external",
    columns: {
      name: {
        title: "Название",
        sort: false,
      },
      created_at: {
        title: "Дата добавления",
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = this.datePipe.transform(raw, "dd.MM.yyyy");
          return formatted;
        },
        sort: false,
      },
    },
  };

  source: CatalogsDataSource;

  resetFilters = () => {
    this.source.reset();
  };

  onEdit = (e) => {
    this.router.navigateByUrl(
      `/pages/catalogs/${this.catalog}/edit/${e.data.id}`
    );
  };

  onDelete = (e) => {
    const { id } = e.data;

    const onDelete = async () => {
      await this.source.remove({ id, catalog: this.catalog });

      const data = await this.source.getElements();

      this.source.load(data);
    };

    this.dialogService.open(DeleteConfirmationDialog, {
      context: {
        onDelete,
      },
    });
  };
}
