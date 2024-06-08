import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../models/productModel';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.#fetchProducts().then(x => {
      x.forEach(i => {
        (i as any).quantity = 1;
      })
      this.items = x;
      this.calculateSummary();
    });
  }

  async #fetchProducts() {
    const res = await fetch('http://localhost:8000/api/products');
    const data: ProductModel[] = await res.json();
    return data as ProductModel[];
  }

  calculateSummary() {
    this.subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.tax = this.subtotal * 0.05;
    this.total = this.subtotal + this.tax;
  }

  checkout() {
    this.router.navigate(['/']);
  }

  remove(itemId: number) {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.calculateSummary();
  }
}
