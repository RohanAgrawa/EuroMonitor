import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { publicAuthenticationService } from "./public-authentication.service";

@Injectable({
    providedIn : 'root'
})

export class PublicAuthGuardService implements CanActivate{

    constructor(private authenticationService: publicAuthenticationService, private router: Router) { }
    
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
        
        return this.authenticationService.publicUser.pipe(map(user => {
            const isAuth = !user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['public-dashboard', 'book-list']);
        }));
    }
}