import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { take, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class IsActiveSessionGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this.auth.getUser();
    const loggedIn = !!user;

    if (loggedIn) {
      console.log("Active Session");
      this.router.navigate(["/escritorio"]);
    }

    return true;
  }
}
