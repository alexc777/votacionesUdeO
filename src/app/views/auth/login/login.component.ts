import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";
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
  aRoute: Boolean;
  constructor(
    public auth: AuthService,
    private router: Router,
    location: Location
  ) {
    router.events.subscribe(routeValue => {
      if (location.path() === "/login") {
        console.log(location.path());
        this.aRoute = true;
      }
    });
  }

  ngOnInit() {}

  login(user: NgForm) {
    console.log(user.value);

    this.router.navigate([`/escritorio`]).then(() => {
      console.log("entro");
    });
  }

  getNgSubmitMethod(email, pass) {
    if (this.aRoute) {
      this.auth.signIn(email, pass);
    } else {
      this.auth.signUp(email, pass);
    }
  }
}
