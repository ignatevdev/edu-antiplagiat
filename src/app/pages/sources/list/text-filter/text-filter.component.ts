import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";

import { FormControl } from "@angular/forms";
import { Column } from "ng2-smart-table/lib/lib/data-set/column";

import { DefaultFilter } from "ng2-smart-table";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { SourcesDataSource } from "../../utils/sources-data-source";

@Component({
  templateUrl: "./text-filter.component.html",
})
export class TextFilterComponent
  extends DefaultFilter
  implements OnInit, OnChanges {
  query: string = "";

  source: SourcesDataSource;
  column: Column;

  type: string;

  inputControl = new FormControl();

  ngOnInit() {
    this.type = this.column.id === "page_num" ? "number" : "text";

    this.inputControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(this.delay))
      .subscribe((value: number) => {
        this.query = value !== null ? this.inputControl.value.toString() : "";
        this.setFilter();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
      this.query = changes.query.currentValue;
      this.inputControl.setValue(this.query);
    }
  }
}
