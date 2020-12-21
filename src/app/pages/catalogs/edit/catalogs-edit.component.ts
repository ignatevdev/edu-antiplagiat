import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogsDataSource } from '../utils/catalogs-data-source';

@Component({
  selector: 'ngx-catalogs-edit',
  templateUrl: './catalogs-edit.component.html',
  styleUrls: ['./catalogs-edit.component.scss'],
})
export class CatalogsEditComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const catalog = this.activatedRoute.snapshot.paramMap.get('catalog');

    this.catalog = catalog;

    this.source = new CatalogsDataSource(this.http, catalog);
  }

  catalog: string;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  element: any;

  source: CatalogsDataSource;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.source.find({ id, catalog: this.catalog }).then(element => {
      this.element = element;

      this.form.setValue({
        name: element.name,
      });
    });
  }

  onEdit() {
    if (this.form.valid) {
      const values = {
        id: this.element.id,
        ...this.form.value,
      };

      this.source.update(values).then((data: any) => {
        this.router.navigateByUrl(`/pages/catalogs/${this.catalog}`);
      });
    }
  }
}
