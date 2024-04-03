import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modelos/product';
import { ProductCart } from 'src/app/modelos/productCart';
import {CartService} from '../../servicios/cart.service'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { PdfService } from 'src/app/servicios/pdf.service';
import { ApiService } from 'src/app/servicios/api.service';

declare var M: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    products: ProductCart[]= [];
    totalPrice: number=0;

  constructor(private cartService:CartService, private router:Router, private loginService:LoginService, private pdfService:PdfService, private apiService:ApiService) { }

  ngOnInit(): void {

      this.cartService.getProducts().subscribe(res=>{  //llama al metodo que toma los productos que van al carrito

      this.products= res; //rellena el array de productos con ellos

      this.totalPrice=this.cartService.getTotal();  //devuelve el total de toda la compra
    })
  }

  removeProduct(product:ProductCart){     //metodo que borra un producto del carro

    this.cartService.removeProduct(product);

  }

  removeAllProducts(){      //metodo que borra todo el carrito
    
    this.cartService.removeAll();

  }

  async addTransaction() {

    const total = this.totalPrice;  //meto en una constante mi precio total del pedido
    let user_id = ''; //inicializo a vacio el id del user, para que no de problemas
    let nombre='';
  
    try {
      //utilizo una promesa para obtener el usuario que ha iniciado sesión mediante la subscripción al observable user$ del servicio login
      
      const user = await new Promise<string>((resolve, reject) => {  
        this.loginService.user$.subscribe({
          next: (user) => resolve(user), //Esta es una forma de obtener el valor actual de user$, que se actualiza cada vez que un usuario inicia o cierra sesión.
                                         //La función next se llama con el valor actual del usuario, y resolve se usa para devolver este valor.
          error: (err) => reject(err),  
        });
      });

  
      user_id = user || ''; // el valor de user_id se actualiza con el valor devuelto por la promesa. 
      // Si el observable emite un valor, entonces user tomará ese valor. Si no se emite ningún valor (no ha iniciado sesión), entonces user será undefined
      //y se asignará el valor por defecto '' (un string vacío) a user_id utilizando el operador lógico ||.

  //Si se ha obtenido el user y el total, llamo al servicio y a guardarTransaction pasándole estos dos valores junto el array de productCart
      if (user_id && total) {

        nombre = this.loginService.getNombreUsuario();
      
        this.cartService.guardarTransaction(user_id, total, this.products).subscribe((res) => {
          M.toast({ html: 'Pedido Realizado' });

             // Recorre el array de productos y actualiza el stock de cada producto
             
          this.products.forEach((product) => {
          const stockAc = product.producto.stock;
          const unidCom = product.cantidad;
          const newStock = stockAc - unidCom;
          this.apiService.putStockProduct(product.producto._id, newStock).subscribe();

        });

         this.pdfService.generatePDF(nombre, user_id,  total, this.products);
          this.cartService.removeAll() //borro el carrito, lo vacio, llamando al metodo del servicio
          this.router.navigate(['/home']);  //redirijo al home

        });

      } else {
        // user_id o total no están definidos, así que maneja el error aquí

        M.toast({ html: 'Debe estar registrado para realizar un pedido' });
        this.router.navigate(['/sign']);  //redirijo al home

      }

    } catch (err) {
      console.error('Error obteniendo el usuario:', err);
      // Manejar el error aquí
    }
    
  }

    
  }


