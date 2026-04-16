import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly formBulider = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm : FormGroup = this.formBulider.group({
    email:[''  ,  [Validators.required, Validators.email ]],
    password:[''  ,  [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ]],
  } 
);

  submitForm():void{
    if(this.loginForm.valid){
      // send data
      console.log(this.loginForm.value);
      this.authService.signIn(this.loginForm.value).subscribe({
        next:(res) => {
          console.log(res);
          if(res.message === 'success'){

            localStorage.setItem('freshToken' , res.token);

            localStorage.setItem('freshUser', JSON.stringify(res.user));

            this.authService.isLogged.set(true);
            console.log(this.authService.isLogged());

            this.router.navigate(['/']);
          }
        },
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
