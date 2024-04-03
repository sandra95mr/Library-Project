import { Component } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  showProduct: boolean = false;
  logado: boolean = false;

  constructor(private loginService: LoginService) {


  }



  ngOnInit() {

    this.loginService.tipo$.subscribe((tipo) => {

      this.logado = tipo !== 0;

      if (tipo === 2) {
    
         this.showProduct=true;

      } else {

        this.showProduct=false;
        
      }

    });


}


}
