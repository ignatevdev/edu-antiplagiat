import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CatalogsDataSource } from "app/pages/catalogs/utils/catalogs-data-source";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { SourcesDataSource } from "../utils/sources-data-source";

@Component({
  selector: "ap-sources-edit",
  templateUrl: "./sources-edit.component.html",
  styleUrls: ["./sources-edit.component.scss"],
})
export class SourcesEditComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.dataSource = new SourcesDataSource(this.http);
    this.publisherSource = new CatalogsDataSource(http, "publishers");
    this.authorsSource = new CatalogsDataSource(http, "authors");
  }

  publisherIdByName: any = {};
  authorIdByName: any = {};

  validatePublisher = (c: FormControl) => {
    if (!this.publisherIdByName[c.value]) {
      return {
        publisherExists: {
          valid: false,
        },
      };
    }

    return null;
  };

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    subject: new FormControl("", [Validators.required]),
    grade: new FormControl("", [Validators.required]),
    isbn: new FormControl("", []),
    publisher: new FormControl("", [
      Validators.required,
      this.validatePublisher,
    ]),
    publish_year: new FormControl("", [Validators.required]),
    publish_num: new FormControl("", []),
    link: new FormControl("", []),
    authors: new FormControl(
      [],
      [Validators.required, Validators.minLength(1)]
    ),
  });

  source: any;

  dataSource: SourcesDataSource;
  publisherSource: CatalogsDataSource;
  authorsSource: CatalogsDataSource;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");

    this.dataSource.find({ id }).then((source) => {
      this.source = source;

      if (source.publisher) {
        this.publisherIdByName[source.publisher.name] = source.publisher.id;
      }

      source.authors.forEach((author) => {
        this.authorIdByName[author.name] = author.id;
      });

      this.form.setValue({
        name: source.name,
        subject: source.subject,
        grade: source.grade,
        isbn: source.isbn,
        publisher: source.publisher?.name,
        publish_year: source.publish_year,
        publish_num: source.publish_num,
        link: source.link,
        authors: source.authors.map((item) => ({
          value: item.name,
          display: item.name,
        })),
      });
    });
  }

  async onEdit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const raw = this.form.value;

      const authorsToCreate = raw.authors.filter(
        ({ value }) => !this.authorIdByName[value]
      );

      const promises = authorsToCreate.map(({ value }) =>
        this.authorsSource.add({
          name: value,
        })
      );

      await Promise.all(promises).then((newAuthors) => {
        newAuthors.forEach(({ data }) => {
          this.authorIdByName[data.name] = data.id;
        });

        const values = {
          id: this.source.id,
          name: raw.name,
          subject: raw.subject,
          grade: raw.grade,
          isbn: raw.isbn,
          publisher_id: this.publisherIdByName[raw.publisher],
          publish_year: raw.publish_year,
          publish_num: raw.publish_num,
          link: raw.link,
          authors: raw.authors.map((item) => this.authorIdByName[item.value]),
        };

        this.dataSource.update(values).then((data: any) => {
          this.router.navigateByUrl("/pages/sources");
        });
      });
    }
  }

  getPublisherOptions = (value: string): Observable<string[]> => {
    return this.publisherSource.suggest(value).pipe(
      map((data) => {
        data.forEach((item) => {
          this.publisherIdByName[item.name] = item.id;
        });

        return data.map((item) => item.name);
      })
    );
  };

  getAuthorOptions = (value: string): Observable<string[]> => {
    return this.authorsSource.suggest(value).pipe(
      map((data) => {
        data.forEach((item) => {
          this.authorIdByName[item.name] = item.id;
        });

        return data.map((item) => item.name);
      })
    );
  };
}
