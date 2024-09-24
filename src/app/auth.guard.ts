import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthentificationService } from './Services/user-authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserAuthentificationService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(true)

    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
    this.authService.redirectUrl = state.url;
    this.authService.navigateToHome();
    return false;
  }

}
