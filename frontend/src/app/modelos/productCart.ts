import { Product } from "./product";

export class ProductCart {
  
    constructor(product:Product) {
     
        this.producto=product;
        this.cantidad=1;
        this.precioTo=product.precio;
    }
  
    producto:Product;
    cantidad: number;
    precioTo:number;
    
  }
  