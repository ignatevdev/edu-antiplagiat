import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss'],
})
export class ContentFormComponent implements OnInit {
  @Input() public form: FormGroup;

  get meta(): FormGroup {
    return this.form.controls.meta as FormGroup;
  }

  ngOnInit() {}
}
