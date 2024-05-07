import { Component,OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/productModel';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  styleUrls: ['./product.component.css'],
})
export class ProductComponent{
  message: string = 'Hello World';
  protected product: ProductModel = {} as ProductModel;
  productName: string = '';
  
  constructor() { 
    this.#fetchProductsByID(1).then(data => {
      this.product = data;
      this.productName = this.product.productName;
      console.log(this.productName);
    });  

    // this.#fetchProducts().then(data => {    
    //   console.log(data);
    // });

    this.#fetchProductsByCategoryName('Beverage').then(data => { 
      console.log('--------Bevarages---------');   
      console.log(data);
    });
  }


  async #fetchProductsByID($id: number){
    const res = await fetch('http://localhost:8000/api/product/1');
    const data: ProductModel = await res.json();
    console.log(data);
    return data as ProductModel;
  }

  async #fetchProducts(){
    const res = await fetch('http://localhost:8000/api/products');
    const data: ProductModel= await res.json();
    console.log(data);
    return data as ProductModel;
  }

  async #fetchProductsByCategory($categoryID: number){
    const res = await fetch('http://localhost:8000/api/products/category/1');
    const data: ProductModel = await res.json();
    console.log(data);
    return data as ProductModel;
  }

  async #fetchProductsByCategoryName($categoryName: string){
    const res = await fetch('http://localhost:8000/api/getProductsByCategoryName/'+$categoryName); 
    const data: ProductModel = await res.json();
    console.log(data);
    return data as ProductModel;
  }

}
