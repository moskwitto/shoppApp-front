import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductModel } from '../models/productModel';
import { MatDialogContent ,MatDialogActions,MatDialogClose} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { CategoryModel } from '../models/CategoryModel';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions,MatDialogClose,NgFor],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  product: ProductModel;
  categoriesArray: CategoryModel[] = [];

  //Constructor: Initializes the product and category array
  //The product and category array are passed from the seller component
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: ProductModel, category: CategoryModel[]},
    private dialog: MatDialog
  ) { 
    this.product = data.product;
    this.categoriesArray= data.category; 
    console.log('In Modal: category'+this.categoriesArray[this.product.productID].commissionPercentage);
    console.log('In Modal: Product'+this.product);
    console.log('In Modal: Product Name - ' + this.product.productName);
    console.log('In Modal: Product ID - ' + this.product.productID);
    console.log('In Modal: Product Price - ' + this.product.price);
    console.log('In Modal: Product Category - ' + this.product.categoryID);
    
  }

  //Closes the dialog: No action by user
  closeDialog(){
    this.dialog.closeAll();
  }
  
  //Updates products: collects data from the modal and sends it to the server
  updateDialog() {
    
    var table=document.querySelector("#modal");
    const newProduct: any=[]; 
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
      fetch('http://localhost:8000/api/updateProduct/'+product.productID, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
          
        }
      }).then(response => response.json())
    }
   
  }

  //Deletes product using product ID
  deleteProduct(productID: number) {
    fetch('http://localhost:8000/api/deleteProduct/'+productID); 
  }

  ngOnInit(): void {}

}
