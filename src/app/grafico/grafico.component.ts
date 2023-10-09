import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDeDatosService } from '../services/base-de-datos.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Subscription } from 'rxjs';
import { Foto, Like } from '../interfaces/foto';

Chart.register(...registerables);
import {Chart, registerables} from 'node_modules/chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent  {

  @ViewChild('pieChart') pieChart: ElementRef<HTMLCanvasElement> | undefined;

  public subFotos: Subscription;
  public fotos: Foto[] = [];
  public chart: any;
  public cargado = false;
  public total = 0;
  public ctx: CanvasRenderingContext2D | null | undefined;
  public cumulativePercentage = 0;
  styles: any[] = [];
  public percentages: number[] = [];

  constructor(private router: Router, private db: BaseDeDatosService) { 
    this.subFotos = this.db.obtenerFotos().subscribe((fotos)=>{
      this.fotos = fotos;
      this.cargado = true;
      for (const item of fotos) {
        this.total += this.obtenerLikes(item.likes);
      }
      this.generarGrafica();
    });
  }

  ngAfterViewInit() {}

  calculateRotationAndScale(i: number): string {
    const startAngle = 0;
    let endAngle = 0;
  
    for (let j = 0; j <= i; j++) {
      endAngle += (this.percentages[j] / 100) * 360; // Convert percentages to degrees
    }
  
    const rotation = `rotate(${startAngle}deg)`;
    const scale = `scale(1, 1)`;
    const transform = `${rotation} ${scale}`;
  
    return `rotate(${endAngle}deg) ${transform}`;
  }
  
  calculateScale(i: number): string {
    const scale = `scale(${this.percentages[i] / 100}, 1)`;
    return scale;
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

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generarGrafica(): void {
    for (const item of this.fotos) {
      if(item.color == undefined)
        item.color = this.getRandomColor();
    }
    if(this.pieChart){
      this.pieChart.nativeElement.width = 250;
      this.pieChart.nativeElement.height = 250;
      this.ctx = this.pieChart.nativeElement.getContext('2d');
      if(this.ctx){
        if(this.chart){
          this.chart.destroy();
        }
        this.chart = new Chart(this.ctx, {
          type: 'pie',
          data: {
            datasets: [{
              data: this.fotos.map(item => this.obtenerLikes(item.likes)),
              backgroundColor: this.fotos.map(item => item.color),
            }],
            //labels: this.turnos.map(item => item.nombre),
          },
          options: {
            responsive: false,
          },
        });
      }
    }
  }

  cerrarSesion(){
    this.cargado = false;
    this.total = 0;
    this.router.navigate(['home']);
  }
  navegarMisFotos(){
    this.cargado = false;
    this.total = 0;
    this.router.navigate(['mis-fotos-lindo']);
  }
  navegarGeneral(){
    this.cargado = false;
    this.total = 0;
    this.router.navigate(['listado-lindo']);
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
    
  
    await this.db.subirFoto(blob, this.db.usuario!);
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    
  
    // Can be set to the src of an image now

  }
}
