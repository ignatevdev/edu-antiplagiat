import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

import { NbDialogService } from "@nebular/theme";

import { ContentDataSource } from "../utils/content-data-source";
import { subjectNames } from "../utils/constants";

import { SourceLinkComponent } from "./source-link/source-link.component";

import { DeleteConfirmationDialog } from "./delete-confirmation-dialog/delete-confirmation-dialog.component";
import { TextFilterComponent } from "./text-filter/text-filter.component";
import { ContentCellComponent } from "./content-cell/content-cell.component";
import { SourcesDataSource } from "../../utils/sources-data-source";

@Component({
  selector: "ap-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.scss"],
})
export class ContentListComponent {
  constructor(
    http: HttpClient,
    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const sourceId = this.activatedRoute.snapshot.paramMap.get("sourceId");

    this.sourceId = sourceId;

    this.dataSource = new ContentDataSource(http, sourceId);
    this.sourcesDataSource = new SourcesDataSource(http);
  }

  sourceId: string;
  sourcesDataSource: SourcesDataSource;
  subjectNames = subjectNames;
  dataSource: ContentDataSource;
  source: any = {};

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
    mode: "external",
    columns: {
      content: {
        title: "Содержимое",
        sort: false,
        type: "custom",
        renderComponent: ContentCellComponent,
        filter: {
          type: "custom",
          component: TextFilterComponent,
        },
      },
      paragraph: {
        title: "Параграф",
        sort: false,
        filter: {
          type: "custom",
          component: TextFilterComponent,
        },
      },
      page_num: {
        title: "Страница",
        sort: false,
        filter: {
          type: "custom",
          component: TextFilterComponent,
        },
      },
      task_num: {
        title: "№ задания",
        sort: false,
        filter: {
          type: "custom",
          component: TextFilterComponent,
        },
      },
      link: {
        title: "Ссылка",
        sort: false,
        type: "custom",
        renderComponent: SourceLinkComponent,
        filter: false,
      },
    },
  };

  get authors() {
    return this.source.authors.map((item) => item.name).join(", ");
  }

  ngOnInit() {
    this.sourcesDataSource.find({ id: this.sourceId }).then((content) => {
      this.source = content;
    });
  }

  resetFilters = () => {
    this.dataSource.reset();
  };

  onEdit = (e) => {
    this.router.navigateByUrl(
      `/pages/sources/view/${this.sourceId}/content/edit/${e.data.id}`
    );
  };

  onDelete = (e) => {
    const { id } = e.data;

    const onDelete = async () => {
      await this.source.remove({ id: e.data.id });

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
