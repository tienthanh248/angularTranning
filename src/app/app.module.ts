import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';

// import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {fakeBackendProvider} from './core/services/fake-backend';
import {AccountService} from './core/services/account.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { HomeComponent } from './home/home.component';
import { FormControlComponent } from './form-control/form-control.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule , AppRoutingModule , ReactiveFormsModule,
    NgxPaginationModule],
  declarations: [AppComponent, PageNotFoundComponent,FormControlComponent, HomeComponent, ProductComponent, ProductDetailComponent, ProductEditComponent],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider
  ]
})
export class AppModule {
}
