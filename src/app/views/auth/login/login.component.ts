import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  email: string = "";
  pass: string = "";

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login(user: NgForm) {
    console.log(user.value);

    this.router.navigate([`/escritorio`]).then(() => {
      console.log("entro");
    });
  }
}
