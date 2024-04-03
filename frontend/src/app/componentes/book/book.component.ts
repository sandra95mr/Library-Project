import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Product } from 'src/app/modelos/product';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() titulo: string;
  @Input() precio: number;
  @Input() ruta: string;
  @Output() addToCartClicked = new EventEmitter<any>();
  @Input() libro: Product;


  constructor() { 



  }

  onAddToCartClick(product: any) {  //detonar un evento output (de hijo a padre) al pinchar en el botón del libro, le pasa como argumento el producto

    this.addToCartClicked.emit(product);

  }

  ngOnInit(): void {

  }

}
