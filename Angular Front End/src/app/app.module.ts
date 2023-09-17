import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductComponent } from './pages/product/product.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditDeleteButtonComponent } from './components/edit-delete-button/edit-delete-button.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PublishedIndicatorComponent } from './components/published-indicator/published-indicator.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    RouterModule.forRoot([
      {
        path: '',
        title: 'Homepage',
        component: ProductListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cart',
        title: 'Shopping Cart',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
      },
      {
        path: 'register',
        title: 'Register',
        component: SignupComponent,
      },
      {
        path: 'checkout',
        title: 'Checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        title: 'Products',
        component: ProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'products/:productId',
        title: 'Product Details',
        component: ProductDetailsComponent,
      },
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
    ProductCardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
