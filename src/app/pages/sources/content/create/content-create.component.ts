import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentDataSource } from '../utils/content-data-source';

@Component({
  selector: 'ngx-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss'],
})
export class ContentCreateComponent {
  form = new FormGroup({
    content: new FormControl('', [Validators.required]),
    page_num: new FormControl('', []),
    paragraph: new FormControl('', []),
    task_num: new FormControl('', []),
    link: new FormControl('', []),
  });

  source: ContentDataSource;
  sourceId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const sourceId = this.activatedRoute.snapshot.paramMap.get('sourceId');

    this.sourceId = sourceId;

    this.source = new ContentDataSource(this.http, sourceId);
  }

  onCreate() {
    if (this.form.valid) {
      const values = {
        ...this.form.value,
        source_id: this.sourceId,
      };

      this.source.add(values).then((data: any) => {
        this.router.navigateByUrl(`/pages/sources/view/${this.sourceId}`);
      });
    }
  }
}
