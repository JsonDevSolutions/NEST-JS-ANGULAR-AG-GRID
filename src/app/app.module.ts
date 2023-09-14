import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './signup/signup.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditDeleteButtonComponent } from './common-components/edit-delete-button/edit-delete-button.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PublishedIndicatorComponent } from './common-components/published-indicator/published-indicator.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    ProductListComponent,
    CartComponent,
    SignupComponent,
    CheckoutComponent,
    ProductComponent,
    EditDeleteButtonComponent,
    ProductDetailsComponent,
    PublishedIndicatorComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
