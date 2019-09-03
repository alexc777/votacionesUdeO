import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { first, switchMap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<any>;
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
        window.alert("You have been succesfully reg");
        this.router.navigate(["/escritorio"]);
      })
      .catch(function(error) {
        console.log(error.code);
      });
  }

  async signIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(["/escritorio"]);
      })
      .catch(function(error) {
        console.log(error.code);
      });
  }
}
