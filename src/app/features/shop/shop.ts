import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from "../../shared/ui/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-shop',
  imports: [CardComponent , NgxPaginationModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit{
private readonly productsService = inject(ProductsService)


  productList = signal<Product[]>([]);
  
  pageSize = signal<number>(0)
  cp = signal<number>(0)
  total = signal<number>(0)

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData():void {
    this.productsService.getAllproducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.productList.set(res.data);

        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      }
    })
  }

  pageChange(num:number):void {
    this.productsService.getAllproducts(num).subscribe({
      next:(res)=>{
        console.log(res);
        this.productList.set(res.data);

        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      }
    })
  }
}
