import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/productModel';
import { CategoryModel } from '../models/CategoryModel';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  imports: [NgFor,RouterLink,MatDialogModule],
  styleUrls: ['./seller.component.css']
})

export class SellerComponent implements OnInit {
  protected products: ProductModel[] = [];
  protected categories: CategoryModel[] = [];
  categoriesArray: CategoryModel[] = [];

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}

  async ngOnInit(){
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
      else{
          this.#fetchVendorByID(parseInt(sellerID)).then(data => {
            this.products = data;
          });
      }
    });
  }

   OpenDialog(product: ProductModel,categoriesArray: CategoryModel[]): void {
    this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
      data: { product: product,category: categoriesArray},
      position: {top: '0', left: '0'},
      hasBackdrop: true
    });
  }
    updateProduct(product: ProductModel){
    this.#deleteProduct(product.productID).then(() => {
      this.products = this.products.filter(p => p.productID !== product.productID);
    });
   }

   showModal(productID: number){
    console.log(productID);
   }

  async #fetchCategories(){
    const res = await fetch('http://localhost:8000/api/categories');
    const data = await res.json();
    return data as CategoryModel[];
  }
  async #fetchVendorByID($id: number){
    const res = await fetch('http://localhost:8000/api/getProductsByVendor/'+$id);
    const data = await res.json();
    return data as ProductModel[];
  }


  async #fetchProducts(){
    const res = await fetch('http://localhost:8000/api/products');
    const data = await res.json();
    return data as ProductModel[];
  }


  async #deleteProduct(id: number) {
    const res = await fetch(`http://localhost:8000/api/deleteProduct/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    return data as ProductModel;
  }

  async #updateProduct(product: ProductModel) {
    const res = await fetch(`http://localhost:8000/api/updateProduct/${product.productID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    const data = await res.json();
    return data as ProductModel;
  }
  search(): number{
    const sellerID=document.getElementById("searchID") as HTMLInputElement;
    const id = sellerID.value;
    console.log(sellerID.textContent);
    console.log(id);

    window.location.href = 'http://localhost:4200/seller/'+id;
    return parseInt(id);

  }

  showImagePopup(imageUrl: string) {
    const popup = window.open(imageUrl, 'Image Popup', 'width=600,height=400');
    popup?.focus();
}

}