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
  selector: "ap-matching",
  templateUrl: "./matching.component.html",
  styleUrls: ["./matching.component.scss"],
})
export class MatchingComponent {
  constructor(
    private authGuard: AuthGuard,
    private toastrService: NbToastrService
  ) {}

  form = new FormGroup({
    first: new FormControl("", []),
    second: new FormControl("", []),
  });

  onSave() {}
}
