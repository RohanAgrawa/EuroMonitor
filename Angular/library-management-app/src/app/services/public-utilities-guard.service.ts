import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { publicAuthenticationService } from "./public-authentication.service";

@Injectable({
    providedIn : 'root'
})

export class PublicUtilityGuardService implements CanActivate, CanActivateChild{

    constructor(private authenticationService: publicAuthenticationService, private router: Router) { }
    
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
        
        return this.authenticationService.publicUser.pipe(take(1), map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/publicAuthentication']);
        }));
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
      }
}