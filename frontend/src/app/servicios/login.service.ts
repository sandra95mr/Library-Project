import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logadoU = new BehaviorSubject<boolean>(false);
  logado$ = this.logadoU.asObservable();

  userU = new BehaviorSubject<any>(null);
  user$ = this.userU.asObservable();

  infoU = new BehaviorSubject<string>('');
  info$ = this.infoU.asObservable();

  tipoU= new BehaviorSubject<number>(0);
  tipo$ = this.tipoU.asObservable(); //el dolar que es una observable

  ciudadU = new BehaviorSubject<string>('');
  ciudad$ = this.ciudadU.asObservable();

  contraU = new BehaviorSubject<string>('');
  contra$ = this.contraU.asObservable();

  correoU = new BehaviorSubject<string>('');
  correo$ = this.correoU.asObservable();

  idU = new BehaviorSubject<string>('');
  id$ = this.idU.asObservable();


  constructor() { 


  }

  login(user: any) {

    this.logadoU.next(true);
    this.userU.next(user);
  }

  logout() {

    this.logadoU.next(false);
    this.userU.next(null);
  }

  setInfo(info: string) {

    this.infoU.next(info);
  }

  setCiudad(ciudad: string) {

    this.ciudadU.next(ciudad);
  }


  setContra(contra: string) {

    this.contraU.next(contra);
  }

  setCorreo(correo: string) {

    this.correoU.next(correo);
  }

  setTipo(tipo: number) {

    this.tipoU.next(tipo);
  }

  setId(id:string) {

    this.idU.next(id);
  }

  getId(): string {

    return this.idU.value;
  }

 
  getCorreo(): string {

    return this.correoU.value;
  }

  getContra(): string {

    return this.contraU.value;
  }

  getCiudad(): string {

    return this.ciudadU.value;
  }


  getNombreUsuario(): string {

    return this.infoU.value;
    
  }



}
