import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './componentes/body/body.component';
import { CartComponent } from './componentes/cart/cart.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { ProductComponent } from './componentes/product/product.component';
import { SignUpComponent } from './componentes/sign-up/sign-up.component';
import { ManagementComponent } from './componentes/management/management.component';
import { FotoComponent } from './componentes/foto/foto.component';


//para precargar solo lo que necesitemos, dependiendo de la ruta que nos visite, nos recarga una cosa u otra


//elementos compartidos: footer, menu, encabezado

//AppRoutingModule importa, configura y exportar al RouterModule. 
//Y que a su vez AppModule al importar a AppRoutingModule dispone de todo lo necesario para realizar el enrutado.
//la ruta queda: RouterModule -> AppRoutingModule -> AppModule


//De hecho, el RouterModule expone un par de métodos de configuración. 
//Se llaman .forRoot(routes:Routes) y .forChild(routes:Routes) 
//y se usan a nivel raíz o todas las demás situaciones respectivamente.
//Ambos reciben una estructura que mantiene un array de rutas y las instrucciones a ejecutar cuando dichas rutas se activen. 
//Las rutas pueden ser estáticas o usar comodines. 
//Las acciones pueden ser de elección de componente para la vista, diferir el trabajo a otro módulo o redirigir al usuario a otra ruta.


//El caso es que necesitamos mostrar un componente u otro en función de una ruta.
//Por tanto habrá que eliminar la referencia explícita a <ab-home>
//y confiar en algo que ya estaba presente pero que no habíamos estudiado, el <router-outlet>.
//Este es un componente que viene con el RouterModule y actúa como un contenedor dinámico,
//incrustando el componente adecuado para cada ruta. El contenido de main.component.ts, ahora será dinámico


//Otra novedad que podemos, y debemos, empezar a usar es la directiva routerLink. 
//Una directiva es una extensión del HTML propia de Angular.
//Se emplea como si fuese un atributo de cualquier elemento y durante la compilación
//genera el código estándar necesario para que lo entiendan los navegadores.

//En concreto esta directiva, que también viene en el módulo routerModule,
//se usa en sustitución del atributo estándar href. 
//Inicialmente nos basta con saber que instruye al navegador para que no solicite la ruta al servidor,
//sino que el propio código local de javaScript se encargará de procesarla.

//Así, por ejemplo en el único y sencillo componente compartido del que disponemos, 
//decidimos usarla para que las idas y venidas entre nuestras rutas no requieran de recarga en el servidor.

//<a routerLink=""> Go home 🏠</a> En concreto esta directiva, que también viene en el módulo routerModule, 
//se usa en sustitución del atributo estándar href.


const routes: Routes = [    //rutas es un arreglo de objetos

  {path:'home', component:HomeComponent

  },

  {
    path:'products/:category', component: BodyComponent

  },

  {
    path:'cart', component: CartComponent

  },

  {
    path:'sign', component:SignUpComponent
  
  },

  {
    path:'login', component:LoginComponent
    
  },

  {

    path:'admin', component:ManagementComponent

  },

  {

    path:'foto', component:FotoComponent

  },

  {
    path:'',         //si la ruta es vacío, cuando llegue al vacio, y yo le diga pathMatch -- que coincida completamente la ruta con el vacio
    pathMatch:'full',                //entonces me redirrecionas al body principal, siempre con la barra delante
    redirectTo:'/home'        //cuando detecte una ruta vacia que coincida completamente que me redirija al componente donde están todos los libros
    
  },


  {
    path:'**',
    redirectTo:'/home'       //la siguiente opcion siempre al final, si hay algun error que nos lleve a la principal
  
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
