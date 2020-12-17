import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NbDialogService } from '@nebular/theme';

import { Router } from '@angular/router';

import { SourcesDataSource } from '../utils/sources-data-source';

import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SourceLinkComponent } from './source-link/source-link.component';
import { TextFilterComponent } from './text-filter/text-filter.component';
import { subjectNames } from '../content/utils/constants';
import { SubjectFilterComponent } from './subject-filter/subject-filter.component';
import { PublisherFilterComponent } from './publisher-filter/publisher-filter.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ngx-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.scss'],
})
export class SourcesListComponent implements OnInit {
  constructor(
    http: HttpClient,
    private dialogService: NbDialogService,
    private router: Router,
  ) {
    this.source = new SourcesDataSource(http);
  }

  contentControl = new FormControl();

  settings: any = {
    actions: {
      columnTitle: 'Действия',
      add: false,
      delete: true,
      position: 'right',
    },

    edit: {
      editButtonContent: 'Редактировать',
    },
    delete: {
      deleteButtonContent: 'Удалить',
    },

    hideSubHader: true,
    sort: false,
    mode: 'external',
    columns: {
      name: {
        title: 'Название',
        sort: false,
        type: 'custom',
        renderComponent: SourceLinkComponent,
        filter: {
          type: 'custom',
          component: TextFilterComponent,
        },
      },
      subject: {
        title: 'Предмет',
        valuePrepareFunction: subject => subjectNames[subject],
        sort: false,
        filter: {
          type: 'custom',
          component: SubjectFilterComponent,
        },
      },
      grade: {
        title: 'Класс',
        sort: false,
        filter: {
          type: 'custom',
          component: TextFilterComponent,
        },
      },
      publisher: {
        title: 'Издатель',
        valuePrepareFunction: publisher => publisher.name,
        sort: false,
        filter: {
          type: 'custom',
          component: PublisherFilterComponent,
        },
      },
      publish_year: {
        title: 'Год',
        sort: false,
        filter: false,
      },
      publish_num: {
        title: 'Издание',
        sort: false,
        filter: false,
      },
    },
  };

  ngOnInit() {
    this.contentControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value: string) => {
        this.source.addFilter({
          field: 'content',
          search: value,
        });
      });
  }

  source: SourcesDataSource;

  onEdit = e => {
    this.router.navigateByUrl(`/pages/sources/edit/${e.data.id}`);
  };

  onDelete = e => {
    const onDelete = async () => {
      await this.source.remove({ id: e.data.id });

      const data = await this.source.getElements();

      this.source.load(data);
    };

    this.dialogService.open(DeleteConfirmationDialogComponent, {
      context: {
        onDelete,
      },
    });
  };

  resetFilters = () => {
    this.source.reset();
    this.contentControl.setValue('');
  };
}
