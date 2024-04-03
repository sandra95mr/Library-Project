import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Product} from "../modelos/product";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  selectedProduct: Product; //producto seleccionado
  products: Product[]; //array de productos
  readonly URL;

  constructor(private http: HttpClient) {  //el constructo con http para poder hacer peticiones

    this.selectedProduct= new Product(); //instancio el producto

    this.URL='http://localhost:3000/api/products';

  }


  getProducts() {  //lo llamaremos nada más iniciar el componente para que se carguen desde el principio

    return this.http.get<Product[]>(this.URL);

  }

  postProduct(product: Product) {
    return this.http.post(this.URL, product);
    
  }

 
  putProduct(product: Product) {
    return this.http.put(this.URL + `/${product._id}`, product);
  }

  deleteProduct(_id: string) {
    return this.http.delete(this.URL + `/${_id}`);
  }

  putStockProduct(productId: string, newStock: number){

      const product = { stock: newStock };
      
      return this.http.put(this.URL + `/${productId}`, product);

    }
  
}
