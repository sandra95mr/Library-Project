import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {   //pipe cree canalizaciones para encapsular transformaciones personalizadas
                                                      //y utilice sus canalizaciones personalizadas en expresiones de plantilla.

  transform(value:any[], filterS: string, prop:string): any[] {   //quitarle lo que viene dentro como parametro, y ponerle esto: que va a recibir un array de elementos
                                                    //y tambien le pasamos una cadena, que será la palabra para filtrar y la propiedad por la que filtrar
    const result: any=[];                  //constante que almacenará nuestro resultado, y que será un array de elementos sin saber el tipo --iniciar a vacio
    
    if (!value || filterS==='' || prop===''){    
      return value;

    }

    value.forEach((a:any)=>{  //recorrer el array
                                                                          
      if (a[prop].trim().toLowerCase().includes(filterS.toLowerCase())){   //quitar espacios en blanco y pasar a minusculas
                                                          //El filtro devolverá cada elemento que tenga la propuedad igual a lo que sea filterS.
          result.push(a)   //meto en el array de resultado que concuerden el objeto

      }
    })

    return result;

 
  }

}
