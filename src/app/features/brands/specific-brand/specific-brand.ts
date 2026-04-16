import { BrandsService } from './../../../core/services/brands.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brands } from '../../../core/models/brands.interface';

@Component({
  selector: 'app-specific-brand',
  imports: [],
  templateUrl: './specific-brand.html',
  styleUrl: './specific-brand.css',
})
export class SpecificBrand implements OnInit{
   private readonly activatedRoute = inject(ActivatedRoute);
   private readonly brandsService = inject(BrandsService);

   specificBrand = signal<Brands>({} as Brands)

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params)=>{
      this.getOneBrand(params.get('id') !)
    })
   }

   getOneBrand(id:string):void{
    this.brandsService.getSpecificBrand(id).subscribe({
      next:(res)=>{
        console.log(res)

        this.specificBrand.set(res.data)
      },
      error:(err) =>{
        console.log(err)
      }
    })
   }
}
