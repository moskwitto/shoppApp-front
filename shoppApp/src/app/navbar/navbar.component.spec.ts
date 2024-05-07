import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'div.navbar.app-page',
  standalone: true,
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.css','../../assets/styles.css'],
})

export class NavbarPageComponent {
  constructor() {}
}