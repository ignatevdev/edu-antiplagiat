import { Component, Input } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: "ap-content-form",
  templateUrl: "./content-form.component.html",
  styleUrls: ["./content-form.component.scss"],
})
export class ContentFormComponent {
  @Input() public form: FormGroup;

  get meta(): FormGroup {
    return this.form.controls.meta as FormGroup;
  }

  ngOnInit() {}
}
