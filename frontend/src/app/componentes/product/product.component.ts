import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
 
})
export class ProductComponent implements OnInit {

 
  @ViewChild('boto1') boto1: ElementRef;
  @ViewChild('boto2') boto2: ElementRef;
  @ViewChild('boto3') boto3: ElementRef;
  @ViewChild('boto4') boto4: ElementRef;
  
  

  constructor(private loginService:LoginService, private renderer2: Renderer2) {   

  }

  ngAfterViewInit(): void {  //para que se ejecute después de que se haya inicializo y renderizado para que no me diga que los input son indefinidos

    const boto1 = this.boto1.nativeElement;
    const boto2 = this.boto2.nativeElement;
    const boto3 = this.boto3.nativeElement;
    const boto4 = this.boto4.nativeElement;


    this.loginService.tipo$.subscribe(tipo => {


      if (tipo == 2) {   //como administrador

      
        this.renderer2.setStyle(boto1, 'visibility', 'hidden');
        this.renderer2.setStyle(boto2, 'visibility', 'hidden');
        this.renderer2.setStyle(boto3, 'visibility', 'hidden');
        this.renderer2.setStyle(boto4, 'visibility', 'hidden');

       
      
      } else if (tipo == 1) {  //como usuario normal

        this.renderer2.setStyle(boto1, 'visibility', 'visible');
        this.renderer2.setStyle(boto2, 'visibility', 'visible');
        this.renderer2.setStyle(boto3, 'visibility', 'visible');
        this.renderer2.setStyle(boto4, 'visibility', 'visible');

      } else {

      
        this.renderer2.setStyle(boto1, 'visibility', 'visible');
        this.renderer2.setStyle(boto2, 'visibility', 'visible');
        this.renderer2.setStyle(boto3, 'visibility', 'visible');
        this.renderer2.setStyle(boto4, 'visibility', 'visible');
        
       
      }
    });
  }

 
  
   
  ngOnInit(): void {

   

  }

  

}
