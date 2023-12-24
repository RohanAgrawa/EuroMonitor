import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class AuthGuardService implements CanActivate{

    constructor(private authenticationService: AuthenticationService, private router: Router) { }
    
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
        
        return this.authenticationService.user.pipe(take(1), map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/login']);
        }));
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
      }
}