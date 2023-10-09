import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SelectorComponent } from './selector/selector.component';
import { ListadoComponent } from './listado/listado.component';
import { ListadoFeoComponent } from './listado-feo/listado-feo.component';
import { MisFotosComponent } from './mis-fotos/mis-fotos.component';
import { MisFotosFeoComponent } from './mis-fotos-feo/mis-fotos-feo.component';
import { GraficoComponent } from './grafico/grafico.component';
import { GraficoFeoComponent } from './grafico-feo/grafico-feo.component';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [ PieChartComponent,AppComponent, SelectorComponent, ListadoComponent, ListadoFeoComponent, MisFotosComponent, MisFotosFeoComponent, GraficoComponent, GraficoFeoComponent],
  imports: [CommonModule, BrowserModule, NgxChartsModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
