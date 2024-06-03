import { Component, OnInit } from '@angular/core';
import { ProductDetailService, ProductDetailResponse } from '../../services/product-detail.service';
import { NgFor, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../models/productModel';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'

})
export class ProductDetailComponent implements OnInit{
  constructor (private productDetailService: ProductDetailService, private route:ActivatedRoute) {}

  productDetail!: ProductDetailResponse[];
  productID!: number;
  products: ProductModel[] = [];
 
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.productID = id;

      if(id) {
        this.getProduct().then(data => {
          console.log(data);
          this.products.push(data);
        });
      }
    });
}

async getProduct(){
  const id = this.productID;
  const res=await fetch('http://localhost:8000/api/product/'+id);
  const data: ProductModel = await res.json();
  return data as ProductModel;
}
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



