import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { CartComponent } from './Pages/cart/cart.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Pages/product-detail', component: ProductDetailComponent, title : 'Product Detail'},
    { path: 'Pages/product-detail/:id/Cart', component: CartComponent, title : 'Cart'},
    
];
