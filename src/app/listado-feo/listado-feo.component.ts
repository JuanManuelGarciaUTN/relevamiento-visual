import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Foto, Like } from '../interfaces/foto';
import { BaseDeDatosService } from '../services/base-de-datos.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-feo',
  templateUrl: './listado-feo.component.html',
  styleUrls: ['./listado-feo.component.scss'],
})
export class ListadoFeoComponent  implements OnInit {

  public subFotos: Subscription;
  public fotos: Foto[] = [];
  constructor(private router: Router, private db: BaseDeDatosService) { 
    this.subFotos = this.db.obtenerFotosFeo().subscribe((fotos)=>{
      this.fotos = fotos;
    });
  }

  ngOnInit() {
    
  }

  like(foto: Foto){
    for (let like of foto.likes) {
      if(this.db.usuario?.correo == like.usuario){
        like.estado = !like.estado;
        this.db.actualizarLikesFeo(foto);
        return;
      }
    }
    if(this.db.usuario)
    foto.likes.push({usuario:this.db.usuario.correo, estado: true});
    this.db.actualizarLikesFeo(foto);
    return;
  }

  dioLike(foto: Foto){
    for (let like of foto.likes) {
      if(this.db.usuario?.correo == like.usuario){
        return like.estado;
      }
    }
    return false;
  }

  obtenerLikes(likes: Like[]):number{
    let contador = 0;
    for (let index = 0; index < likes.length; index++) {
      if(likes[index].estado){
        contador ++;
      }
    }
    return contador;
  }
  
  cerrarSesion(){
    this.router.navigate(['home']);
  }

  navegarMisFotos(){
    this.router.navigate(['mis-fotos-feo']);
  }

  async sacarNuevaFoto(){

    await Camera.requestPermissions();
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 80,
      width: 720,
      height: 1280,
      allowEditing: false,
      promptLabelHeader: "¿Abrir Camara?",
      promptLabelPhoto: "Desde Galería",
      promptLabelPicture: "SI",
    });

    var byteArray = atob(image.base64String!);
    var byteNumbers = new Array(byteArray.length);
    for (var i = 0; i < byteArray.length; i++) {
      byteNumbers[i] = byteArray.charCodeAt(i);
    }
    var blob = new Blob([new Uint8Array(byteNumbers)], { type: "image/jpg" }); // Change the type as per your image format
    
  
    await this.db.subirFotoFeo(blob, this.db.usuario!);
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    
  
    // Can be set to the src of an image now

  }

  navegarGraficos(){
    this.router.navigate(['grafico-feo']);
  }
}
