import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit{
  private readonly categoriesService = inject(CategoriesService);

  categoriesList = signal<Category[]>([])

  ngOnInit(): void {
    this.getCategoriesData()
  }

  getCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList.set(res.data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
