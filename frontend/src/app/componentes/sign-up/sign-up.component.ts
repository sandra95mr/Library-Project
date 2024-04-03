import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/modelos/user';
import { Router } from '@angular/router';
import { ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ChangeDetectorRef } from '@angular/core';
import * as bcrypt from 'bcryptjs';


declare var M: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService],
})

export class SignUpComponent implements OnInit, AfterViewInit {

  saltRounds:number = 10; // Número de rondas de sal utilizadas en el algoritmo de hash, para mayor seguridad
  @ViewChild('titulo') ti: ElementRef;
  @ViewChild('boton1') boton1: ElementRef;
  @ViewChild('foto') foto: ElementRef;
  @ViewChild('eli') eli: ElementRef;
  logado: boolean = false;

  constructor(public userService: UserService, private router: Router, private renderer2: Renderer2, private loginService: LoginService, private cdr: ChangeDetectorRef) {



  }

  ngOnInit(): void {

   

  }

  vaciar(form: NgForm) {

    form.reset();

  }

  generarHash (password: string): string {

    //genera una cadena aleatoria de sal que se utilizará para crear el hash de la contraseña 

    const salt = bcrypt.genSaltSync(this.saltRounds);

    const hash = bcrypt.hashSync(password, salt);

    //genera un hash a partir de la contraseña y la sal generada en la línea anterior

    return hash;

  }

  async addUser(form: NgForm) {


    if (form.value._id) { 

      let contras=this.generarHash(form.value.contrasenia);

      form.value.contrasenia=contras;

      this.userService.putUser(form.value).subscribe((res) => {
  
        this.vaciar(form); 

        M.toast({ html: 'Usuario Modificado' });


        this.deslogar();

      });
  
    } else {

    if (
      !form.value.nombre ||
      !form.value.ciudad ||
      !form.value.email ||
      !form.value.contrasenia
    ) {
      alert('Debe rellenar todos los campos para registrarse');
      return;
    }

    setTimeout(async () => {

    const emailExists = await this.comprobar(form.value.email);

    if (emailExists) {

      alert('Esa dirección de email ya está registrada en nuestra base de datos');

      return;

    }

    let contra= form.value.contrasenia;

    let hash= this.generarHash(contra);

    form.value.contrasenia=hash;

    this.userService.guardarUser(form.value).subscribe((res) => {
      this.cdr.detectChanges(); // Forzar detección de cambios
      form.reset();
      M.toast({ html: 'Usuario Almacenado' });
      this.router.navigate(['/login']);

    });

  }, 0);

  }


}

  comprobar(ema: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

      this.userService.getUsers().subscribe((res) => {

        this.userService.users = res as User[];

        let ok = false;

        if (this.userService.users.length !== 0) {

          this.userService.users.forEach((usuario) => {

            if (usuario.email === ema) {

              ok = true;

            }

          });

        }

        resolve(ok);

      });

    });

  }

  ngAfterViewInit(): void {

    const titu = this.ti.nativeElement;
    const boto = this.boton1.nativeElement;
    const foto = this.foto.nativeElement;
    const eli = this.eli.nativeElement;

    this.loginService.tipo$.subscribe((tipo) => {

      this.logado = tipo !== 0;

      if (tipo === 1) {

        this.logado=true;

        this.renderer2.setProperty(titu, 'textContent', 'MODIFICAR DATOS');
        this.renderer2.setStyle(titu, 'text-align', 'center');
        this.renderer2.setStyle(titu, 'margin-left', '10px');
        this.renderer2.setAttribute(foto, 'src', '../../../../assets/imagenes/yo2.jpg');
        this.renderer2.setStyle(eli, 'visibility', 'visible')

        this.renderer2.setProperty(boto, 'textContent', 'Guardar');


        this.loginService.id$.subscribe((id) => {

          if (id) {

            this.userService.selectedUser._id = id;

          }

        });


        this.loginService.info$.subscribe((info) => {

          if (info) {

            this.userService.selectedUser.nombre = info;

          }

        });

        this.loginService.ciudad$.subscribe((ciudad) => {

          if (ciudad) {

            this.userService.selectedUser.ciudad = ciudad;

          }

        });

        this.loginService.contra$.subscribe((contra) => {

          if (contra) {

            this.userService.selectedUser.contrasenia = contra;

          }

        });

        this.loginService.correo$.subscribe((correo) => {

          if (correo) {

            this.userService.selectedUser.email = correo;

          }

        });


        this.loginService.id$.subscribe((id) => {

          if (id) {

            this.userService.selectedUser._id = id;
            
          }

        });
      }
    });

    this.cdr.detectChanges();

  }

 async editUser(user: User) {


  this.userService.selectedUser = user;

  }

  deleteUser() {


    if(this.userService.selectedUser._id){

    if (confirm("¿Está seguro de que desea eliminar su usuario?")) {  //ventana que pregunta si está seguro de querer eliminarlo, y guardo la respuesta en una constante
      this.userService.deleteUser(this.userService.selectedUser._id).subscribe((res) => {  //borrarUsuario necesita un id
       
        this.deslogar();


      });
    }

  }
  }
  

  async onSubmit(form: NgForm, user: User) {
    
    if (this.logado==true) {

      await this.editUser(user);

    } else {

      await this.addUser(form);
    }
  }


  deslogar(){

    this.loginService.logout();
    this.loginService.infoU.next("");
    this.loginService.tipoU.next(0);


    M.toast({html:'Usuario Deslogado'})

    this.router.navigate(['/login']);
  }

}
