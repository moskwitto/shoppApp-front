import { NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { CategoryModel } from '../models/CategoryModel';
import { ProductModel } from '../models/productModel';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, NgFor],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  product: ProductModel = {} as ProductModel;
  categoriesArray: CategoryModel[] = [];

  //Constructor: Initializes the product and category array
  //The product and category array are passed from the seller component
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { productID: number },
    private dialog: MatDialog
  ) {
    this.getProduct().then(data => {
      this.product = data;
    });
    this.getCategories().then(categories => {
      this.categoriesArray = categories;
    });

  }

  async getProduct() {
    const res = await fetch('http://localhost:8000/api/product/' + this.data.productID);
    const data: ProductModel = await res.json();
    return data as ProductModel;
  }
  getCategories() {
    return fetch('http://localhost:8000/api/categories').then(response => response.json());
  }
  //Closes the dialog: No action by user
  closeDialog() {
    this.dialog.closeAll();
  }

  //Updates products: collects data from the modal and sends it to the server
  updateDialog() {

    var table = document.querySelector("#modal");
    const newProduct: any = [];
    if (table) {
      var editableFields = table.querySelectorAll("[contenteditable='true']");
      editableFields.forEach(function (field) {
        newProduct.push(field.textContent);
      });

      const categoryName = document.getElementById('categoryName')?.textContent ?? '';
      const category = this.categoriesArray.find(cat => cat.categoryName === categoryName);
      const categoryID = category ? category.categoryID : 0;

      const product: ProductModel = {
        productID: parseInt(document.getElementById('productID')?.textContent ?? ''),
        productName: document.getElementById('productName')?.textContent ?? '',
        categoryID: categoryID,
        price: parseInt(document.getElementById('price')?.textContent ?? ''),
        stockAmount: parseInt(document.getElementById('stockAmount')?.textContent ?? ''),
        vendorID: newProduct[5],
        productDescription: document.getElementById('productDescription')?.textContent ?? '',
        productImage: document.getElementById('productImage')?.getAttribute('src') ?? '',
      };
      this.dialog.closeAll();
      console.log(product);
      fetch('http://localhost:8000/api/updateProduct/' + product.productID, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'

        }
      }).then(response => response.json())
    }

  }

  //Deletes product using product ID
  deleteProduct(productID: number) {
    fetch('http://localhost:8000/api/deleteProduct/' + productID);
  }

  ngOnInit(): void { }

}
