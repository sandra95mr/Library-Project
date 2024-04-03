import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import * as FileSaver from 'file-saver';
import { Renderer2 } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {

  
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvasElement') canvasElement: ElementRef;
  @ViewChild('boton2') boton2: ElementRef;


  imageSrc: any;

  stream: MediaStream;

  nombre:string;

  user_id:string;

  filteredImage: any;

  @ViewChild('boton1') boton1: ElementRef;
 

  constructor(private loginService:LoginService, private renderer2: Renderer2, public userService:UserService, private router:Router) { 





  }

  ngOnInit(): void {

    this.sacarNombre();

  }


  takePicture() {

    const boton1 = this.boton1.nativeElement;
    const video = this.videoElement.nativeElement;
    const boton2 = this.boton2.nativeElement;
 

  
    // Ajustar el tamaño del canvas para que coincida con el tamaño del video
    this.canvasElement.nativeElement.width = this.videoElement.nativeElement.videoWidth;
    this.canvasElement.nativeElement.height = this.videoElement.nativeElement.videoHeight;
  
    // Capturar una imagen del video en el canvas
    const ctx = this.canvasElement.nativeElement.getContext('2d');
    if (ctx) {
      ctx.drawImage(
        this.videoElement.nativeElement,
        0,
        0,
        this.canvasElement.nativeElement.width,
        this.canvasElement.nativeElement.height
      );
  
      // Convertir la imagen del canvas en un Blob
      this.canvasElement.nativeElement.toBlob((blob: Blob) => {
        // Crear un objeto imagen para aplicar el filtro
        const img = new Image();
        img.onload = async () => {
          // Aplicar el filtro de corazones
    
          this.filteredImage = await this.applyFilter(img);
  
          // Detener el stream de la cámara
          const stream = this.videoElement.nativeElement.srcObject;
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track: MediaStreamTrack) => {
              track.stop();
            });
          }
  
          this.renderer2.setStyle(boton1, 'visibility', 'hidden');
          this.renderer2.setStyle(video, 'visibility', 'hidden');
          this.renderer2.setStyle(boton2, 'margin-left', '1100px');
          this.renderer2.setStyle(boton2, 'visibility', 'visible');
      
        };
        img.src = URL.createObjectURL(blob);
      });
    }
  }

  
  async applyFilter(image: HTMLImageElement): Promise<ImageData> {

    // Cargar la imagen de fondo para el filtro
    const filtroImg = new Image();
    filtroImg.src = "../../../../assets/imagenes/cora.png";
    await filtroImg.decode();
  
    // Crear un nuevo canvas para dibujar la imagen con el filtro
    const newCanvas = document.createElement('canvas');
    newCanvas.width = image.width;
    newCanvas.height = image.height;
    const newCtx = newCanvas.getContext('2d');
  
    if (newCtx) {
      // Dibujar la imagen capturada en el nuevo canvas
      newCtx.drawImage(image, 0, 0, newCanvas.width, newCanvas.height);
  
      // Dibujar la imagen de fondo encima de la captura
      newCtx.globalAlpha = 1.0; // Ajustar la opacidad a 1.0
      filtroImg.onload = () => {
        newCtx.drawImage(filtroImg, 0, 0, newCanvas.width, newCanvas.height);
      };
  
      // Convertir la imagen con el filtro aplicado en un Blob
      const blob = await new Promise<Blob>((resolve) => {
        newCanvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            throw new Error('No se pudo obtener la imagen como Blob');
          }
        }, 'image/jpeg');
      });
  
      // Crear una URL de objeto para la imagen
      const url = URL.createObjectURL(blob);
  
      // Cargar la imagen desde la URL de objeto
      const img = new Image();
      img.src = url;
  
      await new Promise<void>((resolve) => {
        img.onload = () => {
          // Dibujar la imagen cargada desde assert encima de la captura
          newCtx.drawImage(filtroImg, 0, 0, newCanvas.width, newCanvas.height);
          // Dibujar la imagen final en el canvas
          URL.revokeObjectURL(url);
          resolve();
        };
      });
  
      return newCtx.getImageData(0, 0, newCanvas.width, newCanvas.height);
    }
  
    throw new Error('Error al aplicar el filtro');

  }



  downloadImage(): void {
    // Crear un nuevo canvas para dibujar la imagen
    const newCanvas = document.createElement('canvas');
    newCanvas.width = this.filteredImage.width;
    newCanvas.height = this.filteredImage.height;
    const newCtx = newCanvas.getContext('2d');
  
    if (newCtx) {
      // Dibujar la imagen en el nuevo canvas
      newCtx.putImageData(this.filteredImage, 0, 0);
  
      // Convertir el nuevo canvas en un Blob
      newCanvas.toBlob((newBlob: Blob | null) => {
        if (newBlob !== null) {
          // Guardar la imagen usando FileSaver.js
          FileSaver.saveAs(newBlob, this.nombre + '.jpg');
          // Asignar el objeto Blob a la propiedad imageSrc
          this.imageSrc = newBlob;
        }
      });
    }

    this.router.navigate(['/products/All']);
  }




  ngAfterViewInit() {
    // Obtener una referencia al elemento de video
    const videoElement = this.videoElement;
  
    if (videoElement) {
      // Pedir permiso al usuario para acceder a la cámara
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream: MediaStream) => {
          this.stream = stream;
          // Mostrar el stream de la cámara en el elemento de video
          videoElement.nativeElement.srcObject = stream;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }


  sacarNombre(){

    this.loginService.info$.subscribe(info => {

      if (info) {

        this.nombre=info.toLowerCase();
   
      } 

    });

    this.loginService.user$.subscribe(user => {
      this.user_id = user || '';
      
    });

  }


}
