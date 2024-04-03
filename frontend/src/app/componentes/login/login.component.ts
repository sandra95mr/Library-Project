import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/modelos/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import * as bcrypt from 'bcryptjs';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {

  ok:boolean;
  id:any;
  nombre:string;
  ciudad:string;
  contra:string;
  correo:string;
 

  constructor(public userService: UserService, private router:Router, public loginService:LoginService) { 

  }

  ngOnInit(): void {
  }

  async comprobarUser(form:NgForm) {


    if(!form.value.email && !form.value.contrasenia){

      alert('Todos los campos están vacios')

    } else if (!form.value.email || !form.value.contrasenia){

      alert('Debe rellenar ambos campos')

    } else {

      let ok = await this.comprobar(form.value.email, form.value.contrasenia);

        if (ok==true){

          M.toast({html:'Usuario Logado'}) //M sin el this porque está declarada fuera 

          this.loginService.login(this.id);

          this.loginService.setId(this.id);

          this.loginService.setInfo(this.nombre);

          this.loginService.setContra(this.contra);

          this.loginService.setCiudad(this.ciudad);

          this.loginService.setCorreo(this.correo);

          this.loginService.setId(this.id);
  

          if (form.value.email==='smarcos@gmail.com'){

            this.loginService.setTipo(2);

            this.router.navigate(['/admin']);
            

          } else {

            this.loginService.setTipo(1);
          
            this.router.navigate(['products/All']);
            

          }

        } else {

          alert('Sus datos no pertenecen a ningun usuario')
          this.router.navigate(['/sign']);
        }
    
  }
    
}

checkPassword(password: string, hash: string): boolean {

  return bcrypt.compareSync(password, hash);

}

  comprobar(ema: string, con:string): Promise<boolean> {

    return new Promise((resolve, reject) => {

      this.userService.getUsers()

        .subscribe(res => {

          this.userService.users = res as User[];
          let ok = false;

          if (this.userService.users.length != 0) {

            this.userService.users.forEach(usuario => {

              if (usuario.email==ema){

                let correct=this.checkPassword(con,usuario.contrasenia);

                  if(correct==true){

                    ok = true;
                    this.id=usuario._id;
                    this.nombre=usuario.nombre;
                    this.correo=usuario.email;
                    this.ciudad=usuario.ciudad;
                    this.contra=con;
              }

            }

            });
          }
          resolve(ok);
        });
    });
  }


}
