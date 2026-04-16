import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './features/layouts/navbar/navbar';
import { Footer } from './features/layouts/footer/footer';
import { NgxSpinnerComponent } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , Navbar , Footer, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App{
  protected readonly title = signal('e-commerce-app');
}
