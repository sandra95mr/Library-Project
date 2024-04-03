import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.css']
})
export class AsideLeftComponent implements OnInit {

  public paginas:string;
  public precio:number;

  @Output() propagar=new EventEmitter<string>();
  @Output() propagar2=new EventEmitter<number>();

  constructor() { 

    this.paginas="";
    this.precio=0;

  }


  procesoPropagar(mensaje:any){

    this.paginas= mensaje;

    this.onPropagar();
    
  }

  onPropagar(){

    this.propagar.emit(this.paginas);

  }

  onPropagar2(){

    this.propagar2.emit(this.precio);

  }

  procesoPropagar2(mensaje:any){

      this.precio=mensaje;

      this.onPropagar2();
     
  }


  ngOnInit(): void {
  }

}
