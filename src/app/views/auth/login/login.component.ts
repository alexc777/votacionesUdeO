import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Validators } from "@angular/forms";
import { Translate } from "../../../utils/translate";

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

  getFunGoogle() {
    this.auth.signInWIthGoogle().catch(error => {
      let mssg;
      mssg = this.validateCodes(error.code);
      if (mssg) {
        this.toastr.error(mssg);
      } else {
        console.log(`Codigo ${error.code} Mensaje ${error.message}`);
      }
    });
  }
  getNgSubmitMethod(email, pass) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.aRoute) {
      this.auth.signIn(email, pass).catch(error => {
        let mssg;
        mssg = this.validateCodes(error.code);
        if (mssg) {
          this.toastr.error(mssg);
        } else {
          console.log(`Codigo ${error.code} Mensaje ${error.message}`);
        }
      });
    } else {
      this.auth.signUp(email, pass).catch(error => {
        let mssg;
        mssg = this.validateCodes(error.code);
        if (mssg) {
          this.toastr.error(mssg);
        } else {
          console.log(`Codigo ${error.code} Mensaje ${error.message}`);
        }
      });
    }
  }
  validateCodes(errorCode): string {
    let returnmsg;
    this.errorCodes.forEach(element => {
      if (errorCode === element.code) {
        returnmsg = element.message;
      }
    });
    return returnmsg;
  }
  errorCodes = [
    { code: "auth/wrong-password", message: "La contraseña es inválida " },
    {
      code: "auth/user-not-found",
      message: "No hay ningún registro de usuario correspondiente a este email"
    },
    {
      code: "auth/too-many-requests",
      message: "Demasiados intentos de inicio de sesión fallidos"
    },
    {
      code: "auth/email-already-in-use",
      message:
        "La dirección de correo electrónico ya está siendo utilizada por otra cuenta."
    },
    {
      code: "auth/popup-closed-by-user",
      message:
        "La ventana fue cerrada antes de completar el proceso de autentificacion."
    }
  ];
}
