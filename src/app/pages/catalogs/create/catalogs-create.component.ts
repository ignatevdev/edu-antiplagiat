import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogsDataSource } from '../utils/catalogs-data-source';

@Component({
  selector: 'ngx-catalogs-create',
  templateUrl: './catalogs-create.component.html',
  styleUrls: ['./catalogs-create.component.scss'],
})
export class CatalogsCreateComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  source: CatalogsDataSource;
  catalog: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const catalog = this.activatedRoute.snapshot.paramMap.get('catalog');

    this.catalog = catalog;

    this.source = new CatalogsDataSource(this.http, catalog);
  }

  ngOnInit() {}

  onCreate() {
    if (this.form.valid) {
      const values = {
        ...this.form.value,
      };

      this.source.add(values).then((data: any) => {
        this.router.navigateByUrl(`/pages/catalogs/${this.catalog}`);
      });
    }
  }
}
