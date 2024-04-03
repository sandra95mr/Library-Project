import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { NgForm } from "@angular/forms"; //import esta clase para poder pasarle el formulario al add, o sea ese ngform
import { Product } from "../../modelos/product";
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/servicios/cart.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ActivatedRoute } from '@angular/router';  //import para manejar la informaicon que recibo por ruta prodecente de products con la categoria
import { mergeWith } from 'rxjs';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers: [ApiService],
})
export class BodyComponent implements OnInit {

  
  listProduct:any;
  filterGenre: any;
  wordKey:string="";
  paginas:string;
  precio:number;
  category: string = "All"; // Nueva variable para almacenar la categoría seleccionada



  constructor(private apiService: ApiService, private cartService: CartService, private loginService:LoginService, private route: ActivatedRoute) {   //con esto ya podría empezar a utilizar todos los metodos que definí en la clase api.service.ts

   

  }

  //no deja ejecutar pone error CORS policy, porque angular se está ejecutando en un host y el server en otro, diferentes puertos
  //por ello es necesario decirle a nuestra api/empleado que permita llegar las consultas provenientes de localhost. 
  //Ir a la consola donde está ejecutando node, lo paro (control c), pongo code . se abre entonces otro editor sólo con la carpeta mainEmpleados
  //entrar en index.js, abro consola y escribo npm i cors; lanzo el comando. Entonces lo requerimos como cualquier modulo de node y lo ponemos a usar app.use


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const categoria = params.get('category');
      this.category = categoria ?? "All";
      console.log(this.category);
      this.mostrarProducts();
    });

    // Suscripción a cambios en la búsqueda del carrito
    this.cartService.busqueda.subscribe((valu: any) => {
      this.wordKey = valu;
      this.filter();
    });


    
  }

  procesoPropagar(mensaje:any){

    this.paginas = mensaje;

    this.filter();

   
  }

  procesoPropagar2(mensaje:any){

    this.precio= mensaje;

    this.filter()

  }

 

  mostrarProducts() {       //metodo que muestra las portadas de los productos que hay en la base de datos

    this.apiService.getProducts().subscribe(res => {
      this.listProduct = res;
      this.filter();

    });                    //llamo a la observable del servicio del carrito tambien aqui, para que se puedan actualizar los productos. Que haya feedback entre los dos componentes y el servicio
  }


  addProduct(product:any){ //metodo que recibe un producto y lo añade al carro a traves del servicio

    this.cartService.addProduct(product);
   

  }


  filter() {       //metodo para fitrar por genero literario y por palabra clave
    
    
    let filteredProducts = this.listProduct;

    if (this.category !== 'All') {

      filteredProducts = filteredProducts.filter((a: any) => a.genero === this.category);

    }

    if (this.wordKey) {

      filteredProducts = filteredProducts.filter((a: any) => a.titulo.toLowerCase().includes(this.wordKey.toLowerCase()));

    }

    if (this.paginas === "primero") {

      filteredProducts = filteredProducts.filter((a: any) => a.paginas < 100);

    } else if (this.paginas === "segundo") {

      filteredProducts = filteredProducts.filter((a: any) => a.paginas >= 100 && a.paginas < 150);

    } else if (this.paginas === "tercero") {

      filteredProducts = filteredProducts.filter((a: any) => a.paginas >= 150 && a.paginas < 200);

    } else if (this.paginas === "cuarto") {

      filteredProducts = filteredProducts.filter((a: any) => a.paginas >= 200);

    }

    if (this.precio){

      filteredProducts=filteredProducts.filter((a: any) => a.precio>=0 && a.precio<=this.precio);
      
    }
    


    this.filterGenre = filteredProducts;

  }


}