import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-catalogs-form',
  templateUrl: './catalogs-form.component.html',
  styleUrls: ['./catalogs-form.component.scss'],
})
export class CatalogsFormComponent implements OnInit {
  @Input() public form: FormGroup;

  get meta(): FormGroup {
    return this.form.controls.meta as FormGroup;
  }

  ngOnInit() {}
}
