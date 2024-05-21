import { Component, OnInit } from '@angular/core';
import { ProductDetailService, ProductDetailResponse } from '../../services/product-detail.service';
import { NgFor, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'

})
export class ProductDetailComponent implements OnInit{
  constructor (private productDetailService: ProductDetailService) {}

  productDetail!: ProductDetailResponse[];
  
  ngOnInit() {
    this.getProductDetail();
}
productID: number = 1;
    getProductDetail() {
    this.productDetailService.getProductDetailFun(this.productID).subscribe((response: any) => {
      //  this.productDetail = response.productDetail;
      //  console.log(response.productDetail);
      this.productDetail = Array.isArray(response) ? response : [response];
      // console.log(this.productDetail);
      return response;
    });
  }
}



