import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items = [
    { id: 1, name: "CBA Piros 'A' Quality Rice", quantity: 3, price: 2235 },
    { id: 2, name: "Tomato Juice", quantity: 1, price: 635 },
    { id: 3, name: "Eggplant Until Juice", quantity: 1.2, price: 1558.80 },
  ];

  constructor() { }

  getItems() {
    return this.items;
  }

  removeItem(id: number) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
