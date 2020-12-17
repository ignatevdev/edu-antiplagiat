import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { AuthGuard } from "app/auth-guard.service";

@Component({
  selector: "ap-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authGuard: AuthGuard,
    private toastrService: NbToastrService
  ) {}

  user: any;

  validateForm = (form: AbstractControl) => {
    return form.get("old_password").value && form.get("password").value
      ? null
      : { equals: true };
  };

  form = new FormGroup({
    first_name: new FormControl("", [Validators.required]),
    last_name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    old_password: new FormControl("", []),
    password: new FormControl("", []),
  });

  ngOnInit() {
    this.user = this.authGuard.getUser();

    this.form.setValue({
      email: this.user.email,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      password: "",
      old_password: "",
    });
  }

  onSave() {
    if (this.form.valid) {
      const values = this.form.value;

      const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        old_password: undefined,
        password: undefined,
      };

      if (values.password) {
        data.old_password = values.old_password;
        data.password = values.password;
      }

      this.authGuard
        .updateUser(data)
        .toPromise()
        .then(
          () => {
            this.toastrService.show("Успех", "Профиль сохранен", {
              status: "success",
            });

            this.form.setValue({
              ...this.form.value,
              password: "",
              old_password: "",
            });
          },
          (err) => {
            if (err.error.fields.old_password) {
              this.toastrService.show("Ошибка", "Неправильный пароль", {
                status: "danger",
              });
            } else {
              this.toastrService.show("Ошибка", "Ошибка сохранения профиля", {
                status: "danger",
              });
            }
          }
        );
    }
  }
}
