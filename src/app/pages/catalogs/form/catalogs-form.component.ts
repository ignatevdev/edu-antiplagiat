import { Component, Input } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: "ap-catalogs-form",
  templateUrl: "./catalogs-form.component.html",
  styleUrls: ["./catalogs-form.component.scss"],
})
export class CatalogsFormComponent {
  @Input() public form: FormGroup;

  get meta(): FormGroup {
    return this.form.controls.meta as FormGroup;
  }

  ngOnInit() {}
}
