import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './CanActivateRouter/auth.guard';
import { CheckEditGuard } from './CanDeactivate/check-edit.guard';
import { ResolverService } from './core/services/resolver.service';
import { FormControlComponent } from './form-control/form-control.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,

    children: [
      {
        path: '',
        component: ProductDetailComponent,
      },

      {
        path: 'edit',
        component: ProductEditComponent,
      },
    ],
  },


  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  {
    path: 'add',
    component: FormControlComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'edit/:id',
    component: FormControlComponent,

    canDeactivate: [CheckEditGuard],
    resolve: {
      data_id: ResolverService,
    },
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
