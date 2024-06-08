import { CartComponent } from './Pages/cart/cart.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product-component/product.component';
import { RegisterComponent } from './register/register.component';
import { SellerComponent } from './seller/seller.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Pages/product-detail/:id', component: ProductDetailComponent, title: 'Product Detail' },
  { path: 'Pages/product-detail/:id/Cart', component: CartComponent, title: 'Cart' },
  // { path: '', component: ProductComponent },
  { path: 'product', component: ProductComponent },
  { path: 'getProuctsByCategoryName/:category', component: ProductComponent },
  { path: 'update/:id', component: ProductComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'seller/:id', component: SellerComponent },
  { path: 'delete/:deleteID', component: ProductComponent },
  { path: 'getProductsByName/:productName', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent }

  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
