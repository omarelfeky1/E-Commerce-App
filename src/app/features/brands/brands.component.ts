import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../cart/models/cart.interface';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService);

  brandsList = signal<Brand[]>([])

  ngOnInit(): void {
    this.getBrand()
  }

  getBrand():void {
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res)

        this.brandsList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

