import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/servicios/cart.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  
  transactions: any[] = [];
  user_id:String;

  constructor(private cartService: CartService, private loginService:LoginService) { 



  }

  async idUser() {
 
  
    try {
      if (this.user_id) {
        this.cartService.mostrarTransactionsUser(this.user_id).subscribe((res: any[]) => {
          this.transactions = res;
          
        });
      }
    } catch (err) {
      console.error('Error obteniendo el usuario:', err);
      // Manejar el error aquí
    }

  }

  ngOnInit(): void {

    this.loginService.user$.subscribe(user => {
      this.user_id = user || '';
      this.idUser();
    });
  

  }



}
