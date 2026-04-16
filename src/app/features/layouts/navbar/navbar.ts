import { Component , computed, inject, PLATFORM_ID } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar{
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);

  logged = computed(()=> this.authService.isLogged());

  count = computed(()=> this.cartService.cartCount());

  constructor(private flowbiteService: FlowbiteService){}

  ngOnInit(): void {

    if (isPlatformBrowser(this.pLATFORM_ID)){
       this.getCartCount()

      if (localStorage.getItem('freshToken')){
        this.authService.isLogged.set(true);
      }
    }

    this.flowbiteService.loadFlowbite((flowbite) =>{
      initFlowbite();
    });
  }

  logOut():void{
    this.authService.signOut();
  }

  getCartCount():void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartCount.set(res.numOfCartItems);   
      }
    })
  }
}
