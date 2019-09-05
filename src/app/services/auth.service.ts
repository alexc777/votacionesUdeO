import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { first, switchMap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<any>;
  errmsg: String;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afAuth.authState.pipe(first());
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }
  getUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async signInWIthGoogle() {
    //reference
    const provider = new auth.GoogleAuthProvider();
    //signinwith poopup
    await this.afAuth.auth.signInWithPopup(provider).then(res => {
      this.router.navigate(["/escritorio"]);
    });
  }

  async signOut() {
    return this.afAuth.auth.signOut().then(res => {
      this.router.navigate(["/login"]);
    });
  }

  async signUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(["/escritorio"]);
      });
  }

  async signIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(["/escritorio"]);
      });
  }

  handleError(error) {
    let errormsg = "";
    if (error.error instanceof ErrorEvent) {
      errormsg = `Error: ${error.error.message}`;
      console.log(errormsg);
    } else {
      errormsg = `Error code: ${error.code} Message: ${error.message}`;
      console.log(errormsg);
      this.errmsg = errormsg;
    }
  }
}
