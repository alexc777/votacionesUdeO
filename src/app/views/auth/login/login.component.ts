import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  //email: string = "";
  //pass: string = "";
  aRoute: Boolean;
  constructor(
    public auth: AuthService,
    private router: Router,
    location: Location,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    router.events.subscribe(routeValue => {
      if (location.path() === "/login") {
        console.log(location.path());
        this.aRoute = true;
      }
    });
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      pass: [
        "",
        [
          Validators.required,
          Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"),
          Validators.minLength(4),
          Validators.maxLength(15)
        ]
      ]
    });
  }

  get getUserForm() {
    return this.userForm.controls;
  }

  getNgSubmitMethod(email, pass) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.aRoute) {
      this.auth.signIn(email, pass);
    } else {
      this.auth.signUp(email, pass);
    }
  }
}
