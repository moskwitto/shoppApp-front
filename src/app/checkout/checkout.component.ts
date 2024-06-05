import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  items: any[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.calculateSummary();
  }

  calculateSummary() {
    this.items = this.cartService.getItems();
    this.subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.tax = this.subtotal * 0.05;
    this.total = this.subtotal + this.tax;
  }

  checkout() {
    this.router.navigate(['/']);
  }

  remove(itemId: number) {
    this.cartService.removeItem(itemId);
    this.calculateSummary();
  }
}
