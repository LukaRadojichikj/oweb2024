import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { DRIVERS } from '../db-data';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'test';
  
  PB = DRIVERS[0];

  JM = DRIVERS[1];

  MM = DRIVERS[2];

  vozaci = DRIVERS;

  isVisible = false;

  onAppView(){
    console.log("eve kliknav bace na APP");
  }



}
