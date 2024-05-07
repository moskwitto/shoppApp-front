import { Component,OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/productModel';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  styleUrls: ['./product.component.css'],
  imports: [CommonModule, NgFor],
})
export class ProductComponent implements OnInit{
  message: string = 'Hello World';
  protected products: ProductModel[] = [];
  productName: string = '';
  
  constructor() { 
    this.#fetchProductsByID(3).then(data => {
      this.products.push(data);
    });

    this.#fetchProducts().then((data=> {
      this.products = data;
    }));

  }

  ngOnInit(): void {}



  async #fetchProductsByID($id: number){
    const res = await fetch('http://localhost:8000/api/product/'+$id);
    const data: ProductModel = await res.json();
    return data as ProductModel;
  }

  async #fetchProducts(){
    const res = await fetch('http://localhost:8000/api/products');
    const data: ProductModel[]= await res.json();
    return data as ProductModel[];
  }

  async #fetchProductsByCategory($categoryID: number){
    const res = await fetch('http://localhost:8000/api/products/category/1');
    const data: ProductModel = await res.json();
    return data as ProductModel;
  }

  async #fetchProductsByCategoryName($categoryName: string){
    const res = await fetch('http://localhost:8000/api/getProductsByCategoryName/'+$categoryName); 
    const data: ProductModel = await res.json();
    return data as ProductModel;
  }
  

}
