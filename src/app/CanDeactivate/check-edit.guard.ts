import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControlComponent } from '../form-control/form-control.component';

@Injectable({
  providedIn: 'root'
})
export class CheckEditGuard implements CanDeactivate<FormControlComponent> {
  canDeactivate(
    component: FormControlComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return !component.isEditMode;
  }

}
