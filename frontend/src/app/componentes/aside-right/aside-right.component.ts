import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-aside-right',
  templateUrl: './aside-right.component.html',
  styleUrls: ['./aside-right.component.css']
})
export class AsideRightComponent implements OnInit {

  @ViewChild('bienvenida') input: ElementRef;
  @ViewChild('us') us: ElementRef;
  @ViewChild('boton') input2: ElementRef;
  mostrar:boolean=false;

  constructor(private loginService:LoginService, private renderer2: Renderer2,  private router:Router, private http: HttpClient) {



   }


   
   showFotoComponent():void {

    this.router.navigate(['/foto']);

   }


  ngOnInit(): void {


  }

  ngAfterViewInit(): void {  //para que se ejecute después de que se haya inicializo y renderizado para que no me diga que los input son indefinidos

    const bienvenida = this.input.nativeElement;
    const boton = this.input2.nativeElement;
    const us = this.us.nativeElement;
    

    this.loginService.info$.subscribe(info => {

      if (info) {

        this.renderer2.setProperty(bienvenida, 'innerText', 'BIENVENIDO/A: ' + info);

        this.renderer2.setStyle(boton, 'visibility', 'visible');
        us.style.display = 'block'; // Muestra el elemento si info no está vacío


        

      } else {

        us.style.display = 'none'; // Muestra el elemento si info no está vacío
        
      }

    });

  }

 
  mostrarCompras() {


    if(this.mostrar==true){

      this.mostrar = false;

    } else{

      this.mostrar=true;
     
    }

  }

  

}
