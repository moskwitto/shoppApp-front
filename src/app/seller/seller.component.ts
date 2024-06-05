import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CategoryModel } from '../models/CategoryModel';
import { ProductModel } from '../models/productModel';


@Component({
  standalone: true,
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  imports: [NgFor, RouterLink, MatDialogModule],
  styleUrls: ['./seller.component.css']
})

export class SellerComponent implements OnInit {
  protected products: ProductModel[] = [];
  protected categories: CategoryModel[] = [];
  categoriesArray: CategoryModel[] = [];

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  //parses the route url and calls required functions
  async ngOnInit() {
    const categoriesArray = await this.#fetchCategories();
    categoriesArray.forEach(category => {
      this.categories[category.categoryID] = category;
    });

    this.route.params.subscribe(params => {
      const sellerID = params['id'];
      console.log(sellerID);
      if (!sellerID) {
        this.#fetchProducts().then(data => {
          this.products = data;
        });
      }
      else {
        this.#fetchVendorByID(parseInt(sellerID)).then(data => {
          this.products = data;
        });
      }
    });
  }

  //opens the modal for editing the product==> product and category models are passed
  OpenDialog(productID: number): void {
    this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
      data: { productID: productID },
      position: { top: '0', left: '0' },
      hasBackdrop: true
    });
  }
  updateProduct(product: ProductModel) {
    this.#deleteProduct(product.productID).then(() => {
      this.products = this.products.filter(p => p.productID !== product.productID);
    });
  }

  showModal(productID: number) {
    console.log(productID);
  }


  //fetches all categories
  async #fetchCategories() {
    const res = await fetch('http://localhost:8000/api/categories');
    const data = await res.json();
    return data as CategoryModel[];
  }
  //fetches products by vendor id
  async #fetchVendorByID($id: number) {
    const res = await fetch('http://localhost:8000/api/getProductsByVendor/' + $id);
    const data = await res.json();
    return data as ProductModel[];
  }


  //fetches all products: Default function if no vendor id is passed
  async #fetchProducts() {
    const res = await fetch('http://localhost:8000/api/products');
    const data = await res.json();
    return data as ProductModel[];
  }

  //Deletes product by vendor id
  async #deleteProduct(id: number) {
    const res = await fetch(`http://localhost:8000/api/deleteProduct/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    console.log(data);
    return data;
  }

  //gets content of search bar and redirects to the seller page with the id
  search(): number {
    const sellerID = document.getElementById("searchID") as HTMLInputElement;
    const id = sellerID.value;
    console.log(sellerID.textContent);
    console.log(id);

    window.location.href = 'http://localhost:4200/seller/' + id;
    return parseInt(id);

  }
  //opens a new window with the image for preview
  showImagePopup(imageUrl: string) {
    const popup = window.open(imageUrl, 'Image Popup', 'width=600,height=400');
    popup?.focus();
  }

}
