import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Observable } from 'rxjs';
import {
  debounceTime,
  map,
  mergeMap,
  filter,
  distinctUntilChanged,
} from 'rxjs/operators';

import { DefaultFilter } from 'ng2-smart-table';

import { HttpClient } from '@angular/common/http';
import { Column } from 'ng2-smart-table/lib/lib/data-set/column';
import { FormControl } from '@angular/forms';
import { tap } from 'ramda';
import { SourcesDataSource } from '../../utils/sources-data-source';
import { CatalogsDataSource } from 'app/pages/catalogs/utils/catalogs-data-source';

@Component({
  templateUrl: './publisher-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./publisher-filter.component.scss'],
})
export class PublisherFilterComponent
  extends DefaultFilter
  implements OnInit, OnChanges {
  constructor(private http: HttpClient) {
    super();

    this.catalogsSource = new CatalogsDataSource(this.http, 'publishers');
  }

  query: string;

  publisherIdByName = {};

  source: SourcesDataSource;
  catalogsSource: CatalogsDataSource;
  column: Column;

  filteredOptions$: Observable<string[]>;

  inputControl = new FormControl();

  ngOnInit() {
    this.inputControl.valueChanges.pipe(
      tap(() => {
        this.query = null;
        this.setFilter();
      }),
    );

    this.filteredOptions$ = this.inputControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(this.delay))
      .pipe(filter(val => !!val))
      .pipe(mergeMap(value => this.getFilteredOptions(value)));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.query = changes.query.currentValue;

    if (!this.query) {
      this.inputControl.setValue('');
    }
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return this.catalogsSource.suggest(value).pipe(
      map(data => {
        data.forEach(item => {
          this.publisherIdByName[item.name] = item.id;
        });

        return data.map(item => item.name);
      }),
    );
  }

  // onChange() {
  //   const { filters } = this.source.getFilter();

  //   // Reset filter
  //   if (filters.find((item) => item.field === "user_id")) {
  //     this.source.setFilter(filters.filter((item) => item.field !== "user_id"));
  //   }

  //   this.valueStream.next(this.input.nativeElement.value);
  // }

  onSelectionChange($event) {
    const id = this.publisherIdByName[$event];

    if (id) {
      this.query = id;
      this.setFilter();
    }
  }
}
