import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);

  flag = signal<string>('cash');

  checkOut : FormGroup = this.fb.group({

    shippingAddress : this.fb.group({
      details:['' , [Validators.required] ],
      phone:['' , [Validators.required] ],
      city:['' , [Validators.required] ],
    })

  })
 
  cartId = signal<string>('');

  changeFlag(el:HTMLInputElement):void {
    this.flag.set(el.value);
  }

  submitForm():void {
    if(this.checkOut.valid){
      if(this.flag() === 'cash'){
        
        this.cartService.createCashOrder(this.cartId() , this.checkOut.value).subscribe({
          next:(res)=>{
            console.log(res);

            if (res.status === 'success') {
              this.router.navigate(['/all-orders']);
            }
          }
        })
      }
      else{
        // call api visa
        this.cartService.createVisaOrder(this.cartId() , this.checkOut.value).subscribe({
          next:(res)=>{
            console.log(res);

            if (res.status === 'success') {
              window.open(res.session.url , '_self')
            }
          }
        })
      }
  
    }
  }

  ngOnInit(): void {
    this.getCartId();
  }

  getCartId():void {
    this.activatedRoute.paramMap.subscribe( (params)=> {
      console.log(params.get('id'));

      this.cartId.set(params.get('id')!);
    })
  }




}
