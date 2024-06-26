import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product-component/product.component';
import { SellerComponent } from './seller/seller.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent, ProductComponent, ProductDetailComponent, SellerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shoppApp';
}
