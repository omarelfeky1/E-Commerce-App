import { RenderMode } from '@angular/ssr';
import { SpecificBrand } from './features/brands/specific-brand/specific-brand';
import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Home } from './features/home/home';
import { Shop } from './features/shop/shop';
import { Categories } from './features/categories/categories';
import { BrandsComponent } from './features/brands/brands.component';
import { Wishlist } from './features/wishlist/wishlist';
import { CartComponent } from './features/cart/cart.component';
import { Checkout } from './features/checkout/checkout';
import { AllOrders } from './features/all-orders/all-orders';
import { Profile } from './features/profile/profile';
import { NotFound } from './features/not-found/not-found';
import { ProductDetails } from './features/product-details/product-details';
import { Forgot } from './features/forgot/forgot';
import { authGuard } from './core/auth/guards/auth-guard';



export const routes: Routes = [
    {path:"login", component:Login, title:"login page"},
    {path:"", component:Home, title:"home page"},
    {path:"register", component:Register, title:"register page"},
    {path:"home", component:Home, title:"home page"},
    {path:"shop", component:Shop, title:"shop page"},
    {path:"categories", component:Categories, title:"categories page"},
    {path:"brands", component:BrandsComponent,title:"brands page"},
    {path:"wishlist", component:Wishlist,title:"wishlist page", canActivate:[authGuard]},
    {path:"cart", component:CartComponent, title:"cart page", canActivate:[authGuard]},
    {path:"product-details/:id/:slug", component:ProductDetails, title:"product-details page" , renderMode:"client" },
    {path:"checkout/:id", component:Checkout, title:"checkout page" , canActivate:[authGuard]},
    {path:"forgot", component:Forgot, title:"forgot password page"},
    {path:"all-orders", component:AllOrders, title:"all orders page" , canActivate:[authGuard]},
    {path:"profile", component:Profile, title:"profile page"},
    {path:"**", component:NotFound, title:"notfound page"},
    {path:"specific-brand/:id/:slug" , component:SpecificBrand, title:"specific-brand page" , },
];
