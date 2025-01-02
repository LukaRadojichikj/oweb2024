import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Driver } from '../driver';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input()
  motov:Driver | undefined;

  @Input()
  indx: Number | undefined;

  cuci = new EventEmitter<Driver>();

  onDrvView(){
    //console.log("eve kliknav bace");
    //this.cuci.emit(this.motov)
    
    let link: string | undefined; // --> TS

    //var link = ''; //--> JS

    if (this.motov?.iconUrl)
    {link = this.motov?.iconUrl}
    else
    {
      link = "https://www.google.com"
    };

    window.open(link, "_blank")
  }

  klasi(){
    return {'begin':this.motov?.category=='ASD', 
      
      'adv':this.motov?.category=='EXPERT', 
      
      'undr':true}
  }

  klasi2(){
    if (this.motov?.category=='ASD') {return 'begin'}
    else {return 'adv'}
  }

  stilovi(){
    return 'underline'
  }



  ngOnInit(): void {
    
  }

}
