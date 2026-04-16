import { Component } from '@angular/core';
import { Slider } from './components/slider/slider';
import { CategoryHome } from './components/category-home/category-home';
import { ProductComponent } from './components/product.component/product.component';

@Component({
  selector: 'app-home',
  imports: [Slider, CategoryHome, ProductComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
