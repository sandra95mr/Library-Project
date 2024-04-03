import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  url= 'https://pixabay.com/es/vectors/mano-dibujar-pluma-l%C3%ADnea-arte-6367483/';
  
  constructor() { }

  ngOnInit(): void {
  }

}
