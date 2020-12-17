import { Component, Input } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
} from "rxjs/operators";
import { subjectOptions } from "../content/utils/constants";

@Component({
  selector: "ap-sources-form",
  templateUrl: "./sources-form.component.html",
  styleUrls: ["./sources-form.component.scss"],
})
export class SourcesFormComponent {
  @Input() public form: FormGroup;
  @Input() public getPublisherOptions: (q: string) => Observable<string[]>;
  @Input() public getAuthorOptions: (q: string) => Observable<string[]>;

  constructor(private http: HttpClient) {}

  delay = 300;

  publisherOptions$: Observable<string[]>;

  subjectOptions = subjectOptions;

  gradeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  get authorsErrorMessages() {
    return { error: "Данное поле обязательно" };
  }

  ngOnInit() {
    this.publisherOptions$ = this.form
      .get("publisher")
      .valueChanges.pipe(distinctUntilChanged(), debounceTime(this.delay))
      .pipe(filter((val) => !!val))
      .pipe(mergeMap((value) => this.getPublisherOptions(value)));
  }
}
