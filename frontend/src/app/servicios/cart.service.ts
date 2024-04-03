import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {Product} from "../modelos/product";
import { ProductCart } from '../modelos/productCart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly URL;
  carrito: ProductCart[] = []; //si no inicializo así el array da error
  listaPr= new BehaviorSubject<any>([]);  //un sujeto es un tipo especial de observable para que pueda suscribirse a mensajes
                                        //Necesita un valor inicial ya que siempre debe devolver un valor en la suscripción incluso si no ha recibido unnext()
                                        //Tras la suscripción, devuelve el último valor del sujeto. Un observable normal solo se dispara cuando recibe unonnext
                                        //en cualquier momento, puede recuperar el último valor del asunto en un código no observable utilizando el getValue()método.
                                        //su diferencia de una observable normal, Es que es un observador además de ser un observable por lo que también puedes enviar valores a un sujeto además de suscribirte a él.
                                        //Además, puede obtener un observable del sujeto de comportamiento utilizando el asObservable()

  busqueda= new BehaviorSubject<string>("");   //hacer una observable para manejar la barra de busqueda, de tipo string
  
  
  constructor(private http: HttpClient) {   

    this.URL='http://localhost:3000/api/transactions';

  }

  getProducts(){      //metodo que retorna el contenido de la observable para que aparezcan en el carrito los productos seleccionados

    
    return this.listaPr.asObservable();

  }


  setProduct(product:any){    //

      this.carrito.push(product);
      this.listaPr.next(product);

  }

  addProduct(product:Product){  //metodo que recibe un producto y lo añade

    if(product.stock>0){

    let prodCarrito: ProductCart;

    prodCarrito= new ProductCart(product);

    let prCa= this.carrito.find(p=>
      
      p.producto._id===prodCarrito.producto._id);

      if (prCa && (prCa.cantidad<prCa.producto.stock)){

        prCa.cantidad++;
        prCa.precioTo=prCa.cantidad*prCa.producto.precio;

      } else if (prCa && (prCa.cantidad===prCa.producto.stock)) {

        alert("No quedan ejemplares de ese libro");

      } else {

        this.carrito.push(prodCarrito); //lo inserta en el array de carrito que hemos creado en el servicio
      }
    
    this.listaPr.next(this.carrito); //una vez insertado se genera siempre un evento
                                      //le pasamos el estado del array en el momento, para que luego los observadores puedan saber cómo estaba el array al producirse este evento.
    
    this.getTotal();  //llama al metodoque devuelve el total, para que se vaya actualizando al introducir cada producto

    } else {

      alert("No quedan ejemplares de ese libro");
    }
    //console.log(this.carrito);
  
  }
  getTotal(): number {  //para que devuelva el total

    let total=0; //variable total a cero para iniciar

    this.carrito.map((a:ProductCart)=>{  //con esto recorrer el array carrito y vamos almacenando cada elemento en a
                                     //antes en vez de pruduct poniamos any y luego a.total
      total=total+a.precioTo;  //vamos sumando el precio al total
     
    })

    return total;  //lo devolvemos para poder usarlo en otro lado 
  }

  removeProduct(product:ProductCart){  //metodo que recibe un producto y lo elimina

    let ok=false;
  

    for (let cont=0; cont<this.carrito.length && ok==false; cont++){
      
        if (product.producto._id===this.carrito[cont].producto._id) { //si el id del producto que ha recibido es igual al id del producto que hay dentro de nuestro carrito
          
          ok=true;

            if (product.cantidad==1){  //elimina del carrito 1 elemento desde el índice que le hemos pasado en index, y que es la posicion donde estaba el producto a borrar

            this.carrito.splice(cont,1);
                                  //elimina del carrito 1 elemento desde el índice que le hemos pasado en index, y que es la posicion donde estaba el producto a borrar
        
            } else {

              this.carrito[cont].cantidad--;
              this.carrito[cont].precioTo=this.carrito[cont].precioTo-this.carrito[cont].producto.precio;
            }
        this.listaPr.next(this.carrito); //volvemos a crear el evento para la observable despues de alterar el array
      }
   
  }

}

  removeAll(){  //metodo que borra todos los elementos del carrito

    this.carrito=[]; //vaciamos nuestro array carrito

    this.listaPr.next(this.carrito); //y le pasamos a la observable este array para que sepa como está ahora
  }


  guardarTransaction(id_user:String, total:Number, products:ProductCart[]) {

    const data = { user_id: id_user, total, products };

    return this.http.post(this.URL, data)


  }

  mostrarTransactionsUser(user_id: String) {

    return this.http.get<any[]>(this.URL + `/${user_id}`);
    
  }


}
