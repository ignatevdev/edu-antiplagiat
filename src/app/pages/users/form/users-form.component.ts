import { Component, Input } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

import { userPermissionNames } from "../utils/constants";

@Component({
  selector: "ap-users-form",
  templateUrl: "./users-form.component.html",
  styleUrls: ["./users-form.component.scss"],
})
export class UsersFormComponent {
  @Input() public form: FormGroup;
  @Input() public availablePermissions: string[];

  permissionNames = userPermissionNames;

  get permissionsFormArray() {
    return this.form.controls.permissions as FormArray;
  }

  ngOnInit() {}
}
