import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  selectedPaginas: string;  //para recibir el valor del input del radio button
  selectedPrice: number = 0;


  @Output() propagar=new EventEmitter<string>();          //aqui enviamos del hijo al padre
  @Output() propagar2=new EventEmitter<number>(); 

  constructor() {


   }

  ngOnInit(): void {

  }

  onRadioChange(event: Event) {

    const target = event.target as HTMLInputElement; //target lo detona el evento

    this.selectedPaginas = target.value;  //coges el value de ese radio button

    this.onPropagar();

  }

  onRangePriceChange() {

    this.onPropagar2();

  }



  onPropagar(){

    this.propagar.emit(this.selectedPaginas);

  }

  onPropagar2(){

    this.propagar2.emit(this.selectedPrice);

  }


}
