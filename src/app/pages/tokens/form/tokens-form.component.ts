import { Component, Input } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

import { tokenPermissionNames } from "../utils/constants";

@Component({
  selector: "ap-tokens-form",
  templateUrl: "./tokens-form.component.html",
  styleUrls: ["./tokens-form.component.scss"],
})
export class TokensFormComponent {
  @Input() public form: FormGroup;
  @Input() public availablePermissions: string[];

  permissionNames = tokenPermissionNames;

  get permissionsFormArray() {
    return this.form.controls.permissions as FormArray;
  }

  ngOnInit() {}
}
