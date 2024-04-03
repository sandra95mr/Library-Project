import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { NgForm } from "@angular/forms"; //import esta clase para poder pasarle el formulario al add, o sea ese ngform
import { Product } from "../../modelos/product";
import { ThisReceiver } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

declare var M: any;

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [ApiService],
})
export class ManagementComponent implements OnInit {

  listProduct:any;


  @ViewChild('ti') input: ElementRef;
  @ViewChild('ru') input2: ElementRef;

  constructor(public apiService: ApiService) { 


  }

  ngOnInit(): void {

      this.mostrarProducts();
     
  }


  mostrarProducts() {   

    this.apiService.getProducts()
      .subscribe(res => {
        this.apiService.products = res as Product[]; 
        this.listProduct=res;
       
      })

}

editProduct(product: Product) {

  this.apiService.selectedProduct = product;
}

deleteProduct(_id: string) {

  if (confirm("¿Está seguro de que desea borrar el libro?")) {  //ventana que pregunta si está seguro de querer eliminarlo, y guardo la respuesta en una constante
    this.apiService.deleteProduct(_id).subscribe((res) => {  //borrarEmpleado necesita un id, que va a recibir la funcion deleteEmployee
      this.mostrarProducts();
    });
  }
}


removeTildes(cade: string) {

  var conTilde = /[áéíóúÁÉÍÓÚ]/g;  //la g indica que la busqueda tiene que ser global, no solo para la primera coincidencia
  var sinTilde = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']; //las sustitutas
  var tildes = 'áéíóúÁÉÍÓÚ'; 
  var indice: number;

  return cade.replace(conTilde, function(match) {   //match busca coincidencias

    indice = tildes.indexOf(match); //busca la posición de la letra con tilde en el arreglo tildes, y asigna esa posición a la variable indice
                          //indexOf() devuelve el índice del primer elemento del arreglo que coincide o -1 si no se encuentra.
    if (indice === -1) return match; //si no encuentra coincidencias, devuelve match sin mas sin reemplazo

    return sinTilde[indice]; //devuelve el elemento en el arreglo sinTilde pasandole la posicion correspondiente. Reemplazando las coincidencias

  });
}

ruta() {

  
  let inputValue = this.input.nativeElement.value;
  
  let cadena=inputValue.replace(/\s/g, '').trim();

  cadena=this.removeTildes(cadena);

  let letra= cadena.charAt(0).toUpperCase(); //coge la primera letra y la pone a mayusculas

  let resto= cadena.slice(1).toLowerCase(); //coge el resto de la cadena a partir de la primera letra

  cadena=letra+resto;

  this.input2.nativeElement.value = "./assets/imagenes/" + cadena + ".png";
  
  this.apiService.selectedProduct.ruta="./assets/imagenes/" + cadena + ".png";
}


vaciar(form: NgForm){

  form.reset();
  this.apiService.selectedProduct = new Product();
}

async addProduct(form: NgForm) {


  if (form.value._id) { 

    this.apiService.putProduct(form.value).subscribe((res) => {

      this.vaciar(form); 

      M.toast({ html: 'Producto Modificado' });

      this.mostrarProducts();   //me vuelves a llamar a la funcion para que se actualice la tabla, tras la introduccion de datos
    });

  } else {


    if (!form.value.titulo && !form.value.paginas && !form.value.genero && !form.value.descripcion && !form.value.precio && !form.value.stock) {

        alert('Todos los campos están vacios');

    } else if (!form.value.titulo || !form.value.paginas || !form.value.genero || !form.value.descripcion || !form.value.precio || !form.value.stock) {

        alert('Debe rellenar todos los campos para registrar un producto');

    } else {

        let ok = await this.comprobar(form.value.titulo, form.value.descripcion);

            if (!ok) {

              this.apiService.postProduct(form.value).subscribe((res) => {
              form.reset();
              M.toast({ html: 'Libro Almacenado' });

            });

            } else {

                alert('Ese libro ya está almacenado en nuestra base de datos');
                form.reset();

            }
        }


      }
}


comprobar(ti: String, des:String): Promise<boolean> {

  return new Promise((resolve, reject) => {

    this.apiService.getProducts()

      .subscribe(res => {

        this.apiService.products = res as Product[];
        let ok = false;

        if (this.apiService.products.length != 0) {

          this.apiService.products.forEach(producto => {

            if (producto.titulo == ti && producto.descripcion==des) {
              ok = true;
            }

          });
        }
        resolve(ok);
      });
  });
}



}
