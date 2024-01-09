import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class LoginGuardService implements CanActivate{

    constructor(private authenticationService: AuthenticationService, private router: Router) { }
    
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
        
        return this.authenticationService.user.pipe(map(user => {
            const isAuth = !user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['dashboard', 'books']);
        }));
    }
}