import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/modelos/productCart';
import { CartService } from 'src/app/servicios/cart.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalProducts: number=0;
  wordSearch: string=""; //palabra de busqueda
  products: ProductCart[];
  @ViewChild('regis') input: ElementRef;
  @ViewChild('log') input2: ElementRef;
  @ViewChild('deslog') input3: ElementRef;
  @ViewChild('boto1') boto1: ElementRef;
  @ViewChild('boto2') boto2: ElementRef;
  @ViewChild('busca') busca: ElementRef;
  @ViewChild('perfil') perfil: ElementRef;
  linkValue: string=""; 
  iconClass: string=""; 
  texto:string="";
 


  constructor(private cartService:CartService, private loginService:LoginService, private renderer2: Renderer2, private router:Router) { 




  }

  ngAfterViewInit(): void {  //para que se ejecute después de que se haya inicializo y renderizado para que no me diga que los input son indefinidos

    const regis = this.input.nativeElement;
    const log = this.input2.nativeElement;
    const deslog= this.input3.nativeElement;
    const boto1 = this.boto1.nativeElement;
    const boto2 = this.boto2.nativeElement;
    const busca= this.busca.nativeElement;
    const perfil = this.perfil.nativeElement;

    this.loginService.tipo$.subscribe(tipo => {

      console.log(tipo);

      if (tipo == 2) {   //como administrador

        this.linkValue = "/admin";
        this.iconClass= "glyphicon glyphicon-book";
        this.texto=" MANAGEMENT";
        this.renderer2.setStyle(boto1, 'visibility', 'hidden');
        this.renderer2.setStyle(boto2, 'visibility', 'hidden');
        this.renderer2.setStyle(busca, 'visibility', 'hidden');
        this.renderer2.setStyle(regis, 'visibility', 'hidden');
        this.renderer2.setStyle(log, 'visibility', 'hidden');
        this.renderer2.setStyle(deslog, 'visibility', 'visible');
        this.renderer2.setStyle(perfil, 'visibility', 'visible');
     

        const link = perfil.querySelector('a');
        
        if (link) {

          this.renderer2.setStyle(link, 'background-color', 'rgb(62, 17, 99)');
          this.renderer2.setStyle(link, 'font-size', '1em');
          this.renderer2.setStyle(link, 'color', 'white');
          this.renderer2.setStyle(link, 'text-decoration', 'none');
         // this.renderer2.setStyle(link, 'padding', '10px 15px');
          this.renderer2.setStyle(link, 'display', 'block');
          this.renderer2.setStyle(link, 'font-size', '1em');


          if (link) {
            link.addEventListener('mouseenter', () => {
              
              this.renderer2.setStyle(link, 'font-size', '1.1em');
            });
        
            link.addEventListener('mouseleave', () => {
             
              this.renderer2.setStyle(link, 'font-size', '1em');
            });
          }
        
  
    
        }
       

      } else if (tipo == 1) {  //como usuario normal

        this.renderer2.setStyle(regis, 'visibility', 'hidden');
        this.renderer2.setStyle(log, 'visibility', 'hidden');
        this.renderer2.setStyle(deslog, 'visibility', 'visible');
        this.renderer2.setStyle(boto1, 'visibility', 'visible');
        this.renderer2.setStyle(boto2, 'visibility', 'visible');
        this.renderer2.setStyle(busca, 'visibility', 'visible');


        this.linkValue = "/sign";
        this.iconClass= "glyphicon glyphicon-edit";
        this.texto=" MY PROFILE";
      
        this.renderer2.setStyle(perfil, 'visibility', 'visible');
              
        const link = perfil.querySelector('a');
      
        if (link) {
        this.renderer2.setStyle(link, 'background-color', 'rgb(62, 17, 99)');
        this.renderer2.setStyle(link, 'font-size', '1em');
        this.renderer2.setStyle(link, 'color', 'white');
        this.renderer2.setStyle(link, 'text-decoration', 'none');
        //this.renderer2.setStyle(link, 'padding', '10px 40px');
        this.renderer2.setStyle(link, 'display', 'block');
        this.renderer2.setStyle(link, 'font-size', '1em');

        if (link) {
          link.addEventListener('mouseenter', () => {
           
            this.renderer2.setStyle(link, 'font-size', '1.1em');
          });
      
          link.addEventListener('mouseleave', () => {
     
            this.renderer2.setStyle(link, 'font-size', '1em');
          });
        }
      
      
      
      }      

      } else {

        this.renderer2.setStyle(regis, 'visibility', 'visible');
        this.renderer2.setStyle(log, 'visibility', 'visible');
        this.renderer2.setStyle(deslog, 'visibility', 'hidden');
        this.renderer2.setStyle(perfil, 'visibility', 'hidden');
        this.renderer2.setStyle(boto1, 'visibility', 'visible');
        this.renderer2.setStyle(boto2, 'visibility', 'visible');
        this.renderer2.setStyle(busca, 'visibility', 'visible');
        

      }
    });
  }

  ngOnInit(): void {   //el servicio tiene un array de elementos y esto me muestra ese número
                                              //ahora esta variable total, la imprimo en el html
      this.cartService.getProducts().subscribe(res=>{  //llama al metodo que toma los productos que van al carrito

      this.products= res; //rellena el array de productos con ellos

      this.totalProducts=0;

      for (let cont=0; cont<this.products.length; cont++){

       this.totalProducts=this.totalProducts+this.products[cont].cantidad;
       
      }

      })                         
   }

  search(event:any){
                                    //Si el evento de destino es un evento de elemento DOM nativo, entonces $event usa propiedades como target y target.value.
      this.wordSearch=(event.target as HTMLInputElement).value; //coger el valor del input mientras escribimos y lo escribe en consola
      
      console.log(this.wordSearch);

      this.cartService.busqueda.next(this.wordSearch)  //llamo al atributo busqueda del servicio del carrito, a la observable y le paso el input para que se actualice

  }


  logout(){

    this.loginService.logout();
    this.loginService.infoU.next("");
    this.loginService.tipoU.next(0);

    const regis = this.input.nativeElement;
    const log = this.input2.nativeElement;
    const deslog= this.input3.nativeElement;

    this.renderer2.setStyle(regis, 'visibility', 'visible');
    this.renderer2.setStyle(log, 'visibility', 'visible');
    this.renderer2.setStyle(deslog, 'visibility', 'hidden');

    M.toast({html:'Usuario Deslogado'})

    this.router.navigate(['/home']);



  }



}
