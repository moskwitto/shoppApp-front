import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from "../models/productModel";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<ProductModel[]>('http://localhost:8000/api/products');
  }

  getProductById(id: number) {
    return this.http.get<ProductModel>(`http://localhost:8000/api/product/${id}`);
  }

  getProductsByCategory(categoryId: number) {
    return this.http.get<ProductModel[]>(`http://localhost:8000/api/products/category/${categoryId}`);
  }

  getProductsByCategoryName(categoryName: string) {
    return this.http.get<ProductModel[]>(`http://localhost:8000/api/getProductsByCategoryName/${categoryName}`);
  }
}