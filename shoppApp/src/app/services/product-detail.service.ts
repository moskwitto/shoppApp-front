import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductDetailResponse {
  id: number;
  homeImage: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  productName: string;
  productDescription: string;
  price: number;
  stockAmount: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService { 
  private baseUrl = 'http://localhost:8000/api/product-detail/';

  constructor(private http: HttpClient) {}

  getProductDetailFun(id: number): Observable<ProductDetailResponse> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<ProductDetailResponse>(url);
  }
}
