import { Component,OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/productModel';
import { NgFor, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  styleUrls: ['./product.component.css'],
  imports: [CommonModule, NgFor, RouterLink],
})
export class ProductComponent implements OnInit{
  protected products: ProductModel[] = [];
  productName: string = '';
  static fetchProducts: any;

  constructor(private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const name = params['productName'];
      const category= params['category'];

      if (category) {
        this.#fetchProductsByCategoryName(category).then(data => { 
          this.products = data; });
      } 
    else if (name) {       
      this.#fetchProductsByProductName(name).then(data => { this.products = data; });
    }
      else {
        this.#fetchProducts().then(data => { this.products = data; });
      }
    });
  }


  //Returns product information by using product id
  async #fetchProductsByID($id: number){
    const res = await fetch('http://localhost:8000/api/product/'+$id);
    const data: ProductModel = await res.json();
    return data as ProductModel;
  }

//Returns all products
  async #fetchProducts(){
    const res = await fetch('http://localhost:8000/api/products');
    const data: ProductModel[]= await res.json();
    return data as ProductModel[];
  }
  //Returns products under a common category
  async #fetchProductsByProductName($productName: string){
    const res = await fetch('http://localhost:8000/api/getProductsByName/'+$productName);
    const data: ProductModel []= await res.json();
    return data as ProductModel[];
  }

  //Returns products under a common category name ie 'Electronics' returns all products under car electronics and home electronics
  async #fetchProductsByCategoryName($categoryName: string){
    const res = await fetch('http://localhost:8000/api/getProductsByCategoryName/'+$categoryName); 
    const data: ProductModel []= await res.json();
    return data as ProductModel[];
  }
  

}
