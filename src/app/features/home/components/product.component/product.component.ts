import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { CardComponent } from '../../../../shared/ui/card/card.component';


@Component({
  selector: 'app-product-home',
  imports: [CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productService = inject(ProductsService);
 
  productList = signal<Product[]>([])

  ngOnInit(): void {
    this.getProductsData()
  }

  getProductsData(): void {
    this.productService.getAllproducts().subscribe({
      next: (res) => {
        console.log(res);

        this.productList.set(res.data); //[{} , {}]
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
