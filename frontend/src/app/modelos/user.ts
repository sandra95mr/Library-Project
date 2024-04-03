export class User {

    _id?:string;
    nombre: string;
    ciudad: string;
    email: string;
    contrasenia: string;
  
    constructor(nombre = "", ciudad="", email = "", contrasenia = "") {
    
      this.nombre = nombre;
      this.ciudad = ciudad;
      this.email = email;
      this.contrasenia = contrasenia;
      
  
    }
  


  }
  