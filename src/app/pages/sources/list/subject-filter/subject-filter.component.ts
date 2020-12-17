import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { DefaultFilter } from 'ng2-smart-table';

import { HttpClient } from '@angular/common/http';
import { Column } from 'ng2-smart-table/lib/lib/data-set/column';
import { FormControl } from '@angular/forms';
import { SourcesDataSource } from '../../utils/sources-data-source';
import { subjectOptions } from '../../content/utils/constants';

@Component({
  templateUrl: './subject-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./subject-filter.component.scss'],
})
export class SubjectFilterComponent
  extends DefaultFilter
  implements OnInit, OnChanges {
  constructor(private http: HttpClient) {
    super();
  }

  query: string;

  source: SourcesDataSource;
  column: Column;

  selectControl = new FormControl();

  subjectOptions = subjectOptions;

  ngOnInit() {
    this.selectControl.valueChanges.subscribe(value => {
      this.query = value;
      this.setFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.query = changes.query.currentValue;

    if (!this.query) {
      this.selectControl.setValue(null);
    }
  }
}
