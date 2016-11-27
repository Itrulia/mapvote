import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, protected authService: AuthService) {
    }

    public canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean>|boolean {
        return new Promise((resolve) => {
            resolve(true);
        });
    }
}
