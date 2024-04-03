import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modelos/product';
import { ProductCart } from 'src/app/modelos/productCart';
import {CartService} from '../../servicios/cart.service'

@Component({
  selector: 'app-component-cart',
  templateUrl: './component-cart.component.html',
  styleUrls: ['./component-cart.component.css']
})
export class ComponentCartComponent implements OnInit {

  products: ProductCart[]= [];
  totalPrice: number=0;


  constructor(private cartService:CartService) { 


  }

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

}

