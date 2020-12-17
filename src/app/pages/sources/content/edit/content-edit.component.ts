import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentDataSource } from '../utils/content-data-source';

@Component({
  selector: 'ngx-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.scss'],
})
export class ContentEditComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const sourceId = this.activatedRoute.snapshot.paramMap.get('sourceId');

    this.sourceId = sourceId;

    this.source = new ContentDataSource(this.http, sourceId);
  }

  sourceId: string;

  form = new FormGroup({
    content: new FormControl('', [Validators.required]),
    page_num: new FormControl('', []),
    paragraph: new FormControl('', []),
    task_num: new FormControl('', []),
    link: new FormControl('', []),
  });

  content: any;

  source: ContentDataSource;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('contentId');

    this.source.find({ id }).then(content => {
      this.content = content;

      this.form.setValue({
        content: content.content,
        page_num: content.page_num,
        paragraph: content.paragraph,
        task_num: content.task_num,
        link: content.link,
      });
    });
  }

  onEdit() {
    if (this.form.valid) {
      const values = {
        id: this.content.id,
        source_id: this.content.source_id,
        ...this.form.value,
      };

      this.source.update(values).then((data: any) => {
        this.router.navigateByUrl(
          `/pages/sources/view/${this.content.source_id}`,
        );
      });
    }
  }
}
