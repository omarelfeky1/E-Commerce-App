import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-slider',
  imports: [RouterLink],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Slider {}
