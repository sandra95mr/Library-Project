import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { ProductCart } from 'src/app/modelos/productCart';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {



   }

   fecha(){

    let fechaA="";
    const fecha = new Date();
    let añoActual = fecha.getFullYear();
    let hoy = fecha.getDate();
    let mesActual = fecha.getMonth() + 1; 

    fechaA=fechaA+hoy+ "/" + mesActual + "/" +añoActual;

    return fechaA;

   }

   generatePDF(user:String, user_id:String, num:number, products: ProductCart[]) {
    // Crea un nuevo objeto jsPDF

    const fecha=this.fecha();
    const doc = new jsPDF();

    const imgData = '../../../../assets/imagenes/Sandra2.png'; // aquí debes poner el contenido de tu imagen, es decir la ruta

    // Agrega contenido al documento

    doc.addImage(imgData, 'PNG', 170, 5, 30, 25);
    doc.text(`${fecha}`, 20, 15);
    doc.text(`Código del Cliente: ${user_id}`, 20, 40)
    doc.text(`Nombre del Cliente: ${user}`, 20, 50)

    let lastLineY = 0;

    for (let cont = 0; cont < products.length; cont++) {

      doc.addImage(`${products[cont].producto.ruta}`, 'PNG', 20, 70 + 40 * cont, 30, 36);
      doc.text(`${products[cont].producto.titulo}`, 70, 80 + 40 * cont);
      doc.text(`${products[cont].producto.genero}`, 70, 80 + 40 * cont + 15);
      doc.text(`${products[cont].cantidad}`, 135, 80 + 40 * cont + 15);
      doc.text(`${products[cont].precioTo} €`, 160, 80 + 40 * cont + 15);

      lastLineY = 105 + 40 * cont;
      doc.line(60, lastLineY, 190, lastLineY);
     
    
    }

    doc.text(`Total: ${num} €`, 145, lastLineY + 20);
    
    // Guarda el documento como un archivo PDF
    doc.save('Factura.pdf');
  }


  
}
