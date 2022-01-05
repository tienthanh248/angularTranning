import { catchError, delay } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor( private accountService: AccountService , private router:Router) {
   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(route.params['id']);

      return this.accountService.getUserById(route.params['id']).pipe(
        delay(2000),
        catchError(error=>{
          this.router.navigateByUrl('/404');
          return of(null);
        })
        )
  }
}
