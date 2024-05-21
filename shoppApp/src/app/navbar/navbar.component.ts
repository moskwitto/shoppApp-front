import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../models/CategoryModel';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown'; //install with npm install mdb-angular-ui-kit 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor,NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: MdbDropdownDirective;
  protected categories: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.#fetchCategories();
  }

  async #fetchCategories() {
    const res = await fetch('http://localhost:8000/api/categories');
    const data = await res.json() as CategoryModel[];
    this.categories = data.map(category => category.categoryName);

    return this.categories;
  }
  addCategory() {
    this.categories.push('New Category');
}
search(): void{
  const productName=document.getElementById("searchProduct") as HTMLInputElement;
  window.location.href = 'http://localhost:4200/getProductsByName/'+productName.value;
}

}
