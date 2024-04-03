export class Product {
  
    constructor(_id = "", titulo = "", paginas = 0, genero = "", descripcion = "", precio= 0, stock=0, ruta="") {
      this._id = _id;
      this.titulo = titulo;
      this.paginas = paginas;
      this.genero = genero;
      this.descripcion = descripcion;
      this.precio = precio;
      this.stock = stock;
      this.ruta = ruta;
  
    }
  
    _id: string;
    titulo: string;
    paginas: number;
    genero: string;
    descripcion: string;
    precio: number;
    stock: number;
    ruta: string;


    
  }
  