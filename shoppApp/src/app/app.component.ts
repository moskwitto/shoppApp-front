import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product-component/product.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent,NavbarComponent, FooterComponent, ProductComponent, ProductDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shoppApp';
}
